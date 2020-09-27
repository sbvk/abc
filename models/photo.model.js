var mongoose = require('mongoose');

var photoSchema = new mongoose.Schema({
  name: String,
  desc: String,
  img:
  {
      data:Buffer,
      contentType:String
  }
  });

module.exports = mongoose.model('Image', photoSchema);