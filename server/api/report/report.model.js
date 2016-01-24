'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var ReportSchema = new Schema({
    _id: { type: ObjectId, default: mongoose.Types.ObjectId, required: true },
    name: { type: Number, required: true },
    mobile: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    NoOfBills: { type: Number, required: true },
    amount: { type: Number, required: true },
    avgAmount: { type: Number, required: true}
  },
  {
    collection: 'report',
    autoIndexed: false,
    toJSON: {
      transform: function(reportModel,reportDto) {
        delete reportDto.__v;
      }
    }
  }
);

ReportSchema.statics.fetchAll = function fetchAll() {
  return this.find().sort({_id: -1}).exec();
};


module.exports = mongoose.model('Report', ReportSchema);
