const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number
  },
  synopsis: {
    type: String
  },
  rating: {
    type: String,
    enum: ["G", "PG", "PG-13", "R", "M"]
  },
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', GameSchema);