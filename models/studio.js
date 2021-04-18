const mongoose = require('mongoose');

const StudioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    set: value => value.trim().replace(/\s+/g, " ").toLowerCase(),
    validate: [
      {
        validator: async function (value) {
          const count = await this.model('Studio')
          .countDocuments({ name: value });

          return !count;
        },
        message: props => `${props.value} exists. Please try a different studio name.`
      }
    ]
  }
}, {
  timestamps: true
});

StudioSchema.methods.getGames = async function () {
  return await mongoose.model('Game').find({
    studio: this._id
  });
}

module.exports = mongoose.model('Studio', StudioSchema);