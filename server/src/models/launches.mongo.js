const mongoose = require("mongoose");

const launchesSchema = mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
    // default: 100,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  target: {
    //type: mongoose.ObjectId,
    type: String,
    ref: "Planet",
  },
  rocket: {
    type: String,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true
  },
  upcoming: {
    type: Boolean,
    required: true,
  },
  customers: [String],
});
