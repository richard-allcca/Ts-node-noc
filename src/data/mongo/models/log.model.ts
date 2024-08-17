import mongoose from "mongoose";



const logSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  origin: {
    type: String,
  },
  level: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  },
  createAt: {
    type: Date,
    // default: Date.now // return the number of milliseconds
    default: new Date() // return the current day and time
  }
});

export const LogModel = mongoose.model('Log', logSchema);