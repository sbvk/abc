var mongoose = require('mongoose');

var photoSchema = new mongoose.Schema({
  name: String,
  desc: String,
  price: String,
  img:
  {
      data:Buffer,
      contentType:String,
      base:Buffer
  },

  date: String,
 
  });

module.exports = mongoose.model('Image', photoSchema);