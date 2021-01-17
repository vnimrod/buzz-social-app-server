const { validationResult } = require('express-validator');

const Profile = require('../models/Profile');
const User = require('../models/User');
const Buzz = require('../models/Buzzings')
const sharp = require('sharp')

const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']); //user from our profile schema from the user field - objectId

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const CreateUserProfile = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    birthday,
    relationshipStatus,
    gender,
    highSchool,
    location,
    mobile,
    aboutMe,
  } = req.body;

  const createProfile = new Profile({
    user: req.user.id,
    birthday,
    relationshipStatus,
    gender,
    highSchool,
    location,
    mobile,
    aboutMe,
    avatar: null
  });

  try {
    await createProfile.save();
    res.json(createProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getProfileById = async (req, res, next) => {
  const userId = req.params.uid;
  try {
    const profile = await Profile.findOne({ user: userId }).populate('user', [
      'name',
    ]);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
};

const updateProfile = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const updates = Object.keys(req.body);

  const allowedUpdates = [
    'birthday',
    'relationshipStatus',
    'gender',
    'highSchool',
    'location',
    'mobile',
    'aboutMe',
  ];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' });
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      updates.forEach((update) => {
        profile[update] = req.body[update];
      });
    }

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


const uploadAvatar = async (req, res, next) => {
  let profile = await Profile.findOne({ user: req.user.id });
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height:250 }).jpeg().toBuffer()
  const encoded = buffer.toString('base64')
  profile.avatar = encoded
  await profile.save();
  res.json(profile);
}

const getAvatar = async (req,res,next) => {
  try {
    const profile = await Profile.findOne({user:req.params.uid})
    
    if (!profile) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'User not found' }] });
    }

    res.json(profile.avatar)
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

const createEducation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { college, degree, fieldofstudy } = req.body;

  const newEducation = {
    college,
    degree,
    fieldofstudy,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEducation);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteEducation = async(req,res,next)=> {
  try {
    const profile = await Profile.findOne({user: req.user.id});

    const profileRemoveIndex = profile.education.map((edu) => edu.id).indexOf(req.params.eid)

    profile.education.splice(profileRemoveIndex, 1);

    await profile.save();

    res.json(profile)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

const deleteProfile = async (req, res, next) => {
  try {
    // Remove user buzzings
    await Buzz.deleteMany({ user: req.user.id });

    //Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    //Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getProfile,
  CreateUserProfile,
  getProfileById,
  updateProfile,
  uploadAvatar,
  getAvatar,
  deleteProfile,
  createEducation,
  deleteEducation,
};
