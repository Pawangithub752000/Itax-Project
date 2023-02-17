const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  name : String,
  age : Number,
  department : String,
  married : Boolean,
  salary : Number,
  address : String

})


const Notes = new mongoose.model('Notes', notesSchema);
module.exports = Notes;
