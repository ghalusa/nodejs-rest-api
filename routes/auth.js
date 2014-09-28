var jwt = require('jwt-simple')
  , mongojs = require("mongojs")
  , bcrypt = require('bcrypt-nodejs')
  , configDB = require('../config/database.js');

// Database variables and objects.
var connection_string = configDB.url
  , db = mongojs(connection_string, [configDB.connectionString])
  , configurations = db.collection("configurations")
  , users = db.collection("users");

var auth = {

  login: function(req, res) {

    var email = req.body.email || '';
    var password = req.body.password || '';

    if (email == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
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
            "message": "Invalid credentials"
          });
          return;
        }
      } else {
        // Authentication completely failed.
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid credentials"
        });
        return;
      }
    });
  }
}

/*
 * Helper methods.
 */

function generateToken(user) {
  // Token validity (in days).
  var expires = expiresIn(7);
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

module.exports = auth;