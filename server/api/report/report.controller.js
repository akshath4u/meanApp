'use strict';

var _ = require('lodash');
var Report = require('./report.model');

// Get list of reports
exports.index = function(req, res) {
  Report.fetchAll().then(function (users) {
    return res.status(200).json(users);
  },function(err){
    return handleError(res, err);
  });
};

// Get a single report
exports.show = function(req, res) {
  Report.findById(req.params.id, function (err, report) {
    if(err) { return handleError(res, err); }
    if(!report) { return res.status(404).send('Not Found'); }
    return res.json(report);
  });
};

// Creates a new report in the DB.
exports.create = function(req, res) {
  Report.create(req.body, function(err, report) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(report);
  });
};

// Updates an existing report in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Report.findById(req.params.id, function (err, report) {
    if (err) { return handleError(res, err); }
    if(!report) { return res.status(404).send('Not Found'); }
    var updated = _.merge(report, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(report);
    });
  });
};

// Deletes a report from the DB.
exports.destroy = function(req, res) {
  Report.findById(req.params.id, function (err, report) {
    if(err) { return handleError(res, err); }
    if(!report) { return res.status(404).send('Not Found'); }
    report.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}