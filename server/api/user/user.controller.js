'use strict';

var _ = require('lodash');
var User = require('./user.model');

// Get list of users
exports.index = function(req, res) {
    User.fetchAll().then(function (users) {
        return res.status(200).json(users);
    },function(err){
        return handleError(res, err);
    });
};

// Get a single user
exports.show = function(req, res) {
    User.findById(req.params.id, function (err, user) {
        if(err) { return handleError(res, err); }
        if(!user) { return res.status(404).send('Not Found'); }
        return res.json(user);
    });
};

exports.search = function(req, res) {
    var reg = new RegExp(req.params.search_text,'i');
    User.find({$or : [{name: reg}, {email: reg}]}, function (err, users) {
        if(err) { return handleError(res, err); }
        if(!users) { return res.status(404).send('Not Found'); }
        return res.json(users);
    });
};

// Creates a new user in the DB.
exports.create = function(req, res) {
    User.create(req.body, function(err, user) {
        if(err) { return handleError(res, err); }
        return res.status(201).json(user);
    });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    User.findById(req.params.id, function (err, user) {
        if (err) { return handleError(res, err); }
        if(!user) { return res.status(404).send('Not Found'); }
        var updated = _.merge(user, req.body);
        updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(user);
        });
    });
};

// Deletes a user from the DB.
exports.destroy = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.status(404).send('Not Found'); }
    user.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

// Get list of users
/*exports.reportCronJob = function(req, res) {
  User.calcBills().then(function (users) {
    return res.status(200).json(users);
  },function(err){
    return handleError(res, err);
  });
};*/

function handleError(res, err) {
  return res.status(500).send(err);
}