var jwt = require('jwt-simple')
  , mongojs = require("mongojs")
  , configDB = require('../config/database.js')
  // Database variables and objects.
  , connection_string = configDB.url
  , db = mongojs(connection_string, [configDB.connectionString])
  , users = db.collection("users")
  , revokedTokens = db.collection("revokedTokens");

module.exports = function(req, res, next) {
  // Cross domain request, checking to see if the app is safe.
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

  if (token && key) {

    var token_parts = token.split(".");
    var token_db = token_parts[2];
    var decoded = jwt.decode(token, require('../config/secret.js')());
    // console.log('decoded');
    // console.log(decoded);

    try {
      // Check to determine if the token is expired.
      if (decoded.exp <= Date.now()) {
        res.status(401);
        res.json({
          "status": 401,
          "message": "Token has expired."
        });
        return;
      }
      // Check the database to see if the token has been revoked.
      revokedTokens.findOne({'tokenData': token_db}, function(err, data){
        if(data) {
          res.status(401);
          res.json({
            "status": 401,
            "message": "Token has been revoked. Please login to obtain a new token."
          });
          return;
        } else {
          // Check the database to see if the username exists.
          // key = logged in user's username
          users.findOne({'local.email': key}, function(err, data) {
            if(data) {
              next();
            } else {
              // User not found in the database.
              res.status(401);
              res.json({
                "status": 401,
                "message": "The user was not found in the database"
              });
              return;
            }
          });
        }
      });

    } catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Internal server error",
        "error": err
      });
      res.end();
    }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "The token or key was not valid"
    });
    return;
  }
};