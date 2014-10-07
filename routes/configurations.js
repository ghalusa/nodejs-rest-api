var mongojs = require("mongojs")
  , url = require("url")
  , configDB = require('../config/database.js');

// Database variables and objects.
var connection_string = configDB.url
  , db = mongojs(connection_string, [configDB.connectionString])
  , configurationsData = db.collection("configurations");

var configurations = {

  getAll: function(req, res) {
    // Set some initial variables.
    var options = {};
    var sortFieldArray = {};
    var sortFieldName = req.params.sort_field ? req.params.sort_field : 'name';
    // Sort - default 1 (ascending)
    if(req.params.sort_order == 'desc') {
      sortFieldArray[sortFieldName] = -1;
    } else {
      sortFieldArray[sortFieldName] = 1;
    }
    options.sort = sortFieldArray;
    // Skip - default 0
    options.skip = req.params.start_record ? parseInt(req.params.start_record) : 0;
    // Limit - default 10
    options.limit = req.params.stop_record ? parseInt(req.params.stop_record) : 10;
    // Query
    configurationsData.find({}, options).toArray(function(err, data) {
      if(data){
        res.json(data);
      } else {
        res.status(500);
        res.json({
          "status": 500,
          "message": "Internal server error",
          "error": err
        });
      }
    });
  },

  getOne: function(req, res) {
    var id = req.params.id;
    configurationsData.findOne({_id:mongojs.ObjectId(id)} , function(err, data){
      if(data){
        res.json(data);
      } else {
        res.status(404);
        res.json({
          "status": 404,
          "message": "Record not found",
          "error": err
        });
      }
    });
  },

  create: function(req, res) {
    if(req.body.name && req.body.hostname && req.body.port && req.body.username) {
      configurationsData.save(req.body , function(err, data){
        if(data){
          res.json(data);
        } else {
          res.status(500);
          res.json({
            "status": 500,
            "message": "Internal server error",
            "error": err
          });
        }
      });
    } else {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Internal server error",
        "error": err
      });
    }
  },

  update: function(req, res) {
    var updateConfiguration = req.body;
    var id = req.params.id;
    configurationsData.findAndModify({
        query: { _id:mongojs.ObjectId(id) },
        update: { $set: req.body },
        new: true
      }, function(err, data){
        if(data){
          res.json(data);
        } else {
          res.status(404);
          res.json({
            "status": 404,
            "message": "Record not found.",
            "error": err
          });
        }
    });
  },

  delete: function(req, res) {
    var id = req.params.id;
    configurationsData.remove({_id:mongojs.ObjectId(id)} , function(err, data){
      if(data){
        res.json('Record \''+id+'\' deleted.');
      } else {
        res.status(404);
        res.json({
          "status": 404,
          "message": "Record not found",
          "error": err
        });
      }
    });
  }
};

module.exports = configurations;