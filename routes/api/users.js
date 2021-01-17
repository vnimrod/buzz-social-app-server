const express = require('express');
const { check } = require('express-validator');


const auth = require('../../middlware/auth');
const usersController = require('../../controllers/user');

const router = express.Router();

// @route         GET users/me
// @description   Auth route

router.get('/me', auth, usersController.getUser);

// @route         POST users/signup
// @description   Signup route

router.post(
  '/signup',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').normalizeEmail().isEmail(),
    check(
      'password',
      'Password should contain at least 6 characters'
    ).isLength({ min: 6 }),
  ],
  usersController.signup
);

// @route         POST users/login
// @description   Login route

router.post(
  '/login',
  [
    check('email', 'Wrong email or password').isEmail(),
    check('password', 'Wrong email or password').exists(),
  ],
  usersController.login
);


module.exports = router;
