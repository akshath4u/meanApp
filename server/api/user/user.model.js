'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var addrSchema = new Schema({
  flat: { type: String, required: true, default: ' ' },
  street: { type: String, required: true, default: ' '},
  state: { type: String, required: true, default: ' ' },
  pinCode: { type: String, required: true, default: ' '}
});


var userSchema = new Schema(
  {
    _id: { type: ObjectId, default: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: [addrSchema],
    dob: { type: Date, required: true},
    activeFlag: { type: Boolean, required: true, default: true }
  },
  {
    collection: 'user',
    autoIndexed: false,
    toJSON: {
      transform: function(userModel, userDto) {
        delete userDto.__v;
        delete userDto.activeFlag;
      }
    }
  }
);

userSchema.statics.fetchAll = function fetchAll() {
  return this.find({activeFlag:true}).sort({_id: -1}).exec();
};

/*userSchema.statics.create = function create(userDto,cb) {
  return this.save(userDto).exec();
};

userSchema.statics.create = function create(userDto,cb) {
  return this.save(userDto).exec();
};

userSchema.statics.create = function create(userDto,cb) {
  return this.save(userDto).exec();
};
*/
module.exports = mongoose.model('User', userSchema);
