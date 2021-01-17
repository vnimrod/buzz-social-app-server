const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    birthday: {
      type: String,
      // required: true,
    },
    relationshipStatus: {
      type: String,
    },
    gender: {
      type: String,
      // required: true,
    },
    highSchool: {
      type: String,
    },
    location: {
      type: String,
    },
    mobile: {
      type: String,
    },
    aboutMe: {
      type: String,
    },
    avatar: {
      type: String,
    },
    education: [
      {
        college: {
          type: String,
        },
        degree: {
          type: String,
        },
        fieldofstudy: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;
