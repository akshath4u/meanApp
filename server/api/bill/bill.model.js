'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require('../user/user.model');
//var controller = require('./report.controller');

var itemSchema = new Schema({
  name: { type: String, required: true},
  quantity: { type: Number, required: true},
  Rate: { type: Number, required: true}
 
});

var BillSchema = new Schema({
    _id: { type: ObjectId, default: mongoose.Types.ObjectId, required: true },
    billNo: { type: Number, required: true },
    billDate: { type: Date, required: true },
    items: [itemSchema],
    discount: { type: Number, required: true },
    tax: { type: Number, required: true },
    customerId: { type: ObjectId, required: true, ref : 'User'}
  },
  {
    collection: 'bill',
    autoIndexed: false,
    toJSON: {
      transform: function(userModel, userDto) {
        delete userDto.__v;
      }
    }
  }
);

BillSchema.statics.reportCalc = function reportCalc() { 
  //var res=this.find().populate('customerId').sort({_id: -1}).exec();
  return this.find().populate('customerId').sort({_id: -1}).exec();
}
module.exports = mongoose.model('Bill', BillSchema);
