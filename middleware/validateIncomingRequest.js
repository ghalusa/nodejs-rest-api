var jwt = require('jwt-simple')
  , mongojs = require("mongojs")
  , configDB = require('../config/database.js');

// Database variables and objects.
var connection_string = configDB.url
  , db = mongojs(connection_string, [configDB.connectionString])
  , users = db.collection("users");

module.exports = function(req, res, next) {

  // Cross domain request, checking to see if the app is safe.

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

  if (token || key) {
    try {
      var decoded = jwt.decode(token, require('../config/secret.js')());

      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }

      // Authenticate.
      // key = logged in user's username
      users.findOne({'local.email': key}, function(err, data) {
        if(data) {
          if ((req.url.indexOf('admin') >= 0 && data.local.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/') >= 0)) {
            next();
          } else {
            res.status(403);
            res.json({
              "status": 403,
              "message": "Not Authorized"
            });
            return;
          }
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

    } catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Internal server error",
        "error": err
      });
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
