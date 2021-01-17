const express = require('express');
const { check } = require('express-validator');
const multer = require('multer');

const auth = require('../../middlware/auth');
const profilesController = require('../../controllers/profile');

const router = express.Router();

// @route         GET profile/me
// @description   Get user profile

router.get('/me', auth, profilesController.getProfile);

// @route         Post /profile
// @description   Create user profile

router.post(
  '/',
  [
    auth,
    [
      check('birthday', 'Birthday is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check('gender', 'Gender is required').not().isEmpty(),
      check('relationshipStatus', 'Relationship Status is required').not().isEmpty(),
      check('highSchool', 'High School is required').not().isEmpty(),
      check('mobile', 'Mobile is required').not().isEmpty(),
      check('aboutMe', 'About Me is required').not().isEmpty(),
    ],
  ],
  profilesController.CreateUserProfile
);

// @route         Get /profile/user/:uid
// @description   Get profile by user id

router.get('/user/:uid', profilesController.getProfileById);

// @route         Update /profile/me
// @description   Update auth profile

router.patch(
  '/me',
  [
    auth,
    [
      check('birthday', 'Birthday is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check('gender', 'Gender is required').not().isEmpty(),
      check('relationshipStatus', 'Relationship Status is required').not().isEmpty(),
      check('highSchool', 'High School is required').not().isEmpty(),
      check('mobile', 'Mobile is required').not().isEmpty(),
      check('aboutMe', 'About Me is required').not().isEmpty(),
    ],
  ],
  profilesController.updateProfile
);


const upload = multer({
  limits: {
    fileSize: 1000000,
  },

  fileFilter(req, file, cb) {
    
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload only jpg or jpeg or png files'));
    }
    cb(undefined, true); 
  },
});

// @route         POST profile/avatar
// @description   Upload user avatar

router.post(
  '/me/avatar',
  auth,
  upload.single('avatar'),
  profilesController.uploadAvatar,

  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// @route         Get profile/:uid/avatar
// @description   Get user avatar

router.get('/:uid/avatar',auth, profilesController.getAvatar);


// @route         Put /profile/education
// @description   Create profile education

router.put(
  '/education',
  [
    auth,
    [
      check('college', 'College is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Fieldofstudy is required').not().isEmpty(),
    ],
  ],
  profilesController.createEducation
);

// @route         Delete /profile/education/:eid
// @description   Create profile education

router.delete('/education/:eid', auth, profilesController.deleteEducation);

// @route         Delete /profile/me
// @description   Delete profile, user & posts

router.delete('/me', auth, profilesController.deleteProfile);

module.exports = router;
