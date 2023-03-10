const mongoose = require("mongoose");

const planetSchema = mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  }});

const planets = mongoose.model('Planet', planetSchema)

module.exports = planets