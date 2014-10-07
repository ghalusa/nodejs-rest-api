var jwt = require('jwt-simple')
  , mongojs = require("mongojs")
  , bcrypt = require('bcrypt-nodejs')
  , configDB = require('../config/database.js');

// Database variables and objects.
var connection_string = configDB.url
  , db = mongojs(connection_string, [configDB.connectionString])
  , configurations = db.collection("configurations")
  , users = db.collection("users")
  , revokedTokens = db.collection("revokedTokens");

var auth = {

  login: function(req, res) {

    var email = req.body.email || '';
    var password = req.body.password || '';

    if (email == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid (empty)"
      });
      return;
    }

    // Check to see if the user is in the database.
    users.findOne({'local.email': email}, function(err, data) {
      if(data) {
        // Validate the password.
        var validated_password = bcrypt.compareSync(password, data.local.password);
        if(validated_password) {
          // Password validated.
          // Generate a token and send it back to the client.
          res.json(generateToken(data.local));
        } else {
          // Password validation failed.
          res.status(401);
          res.json({
            "status": 401,
            "message": "Invalid (validation)"
          });
          return;
        }
      } else {
        // Authentication completely failed.
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid (not found)"
        });
        return;
      }
    });
  },
  logout: function(req, res) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var token_parts = token.split(".");
    revokedTokens.save( {'tokenData':token_parts[2]}, function(err, data){
      if(data){
        res.status(200);
        res.json({
          "status": 200,
          "message": "Logout successful. Token has been revoked."
        });
      } else {
        res.status(500);
        res.json({
          "status": 500,
          "message": "Internal server error",
          "error": err
        });
      }
    });
  }
}

/*
 * Helper methods.
 */

function generateToken(user) {
  // Token validity (in days).
  var expires = expiresIn(1);
  // Token validity (in minutes - for testing).
  // var expires = expiresInMinutes(1);
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());

  return {
    token: token,
    expires: expires,
    user: user
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

function expiresInMinutes(numMinutes) {
  var now = new Date();
  return now.setMinutes(now.getMinutes() + numMinutes);
}

module.exports = auth;