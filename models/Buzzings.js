const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BuzzingSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
      required: true,
    },
    name: {
      type: String
    },
    avatar: {
      type: String,
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        name:{
          type: String
        },
        text: {
          type: String,
          required: true,
        },
        avatar: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Buzzing = mongoose.model('Buzzing', BuzzingSchema);

module.exports = Buzzing
