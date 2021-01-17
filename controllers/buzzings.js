const { validationResult } = require('express-validator');

const User = require('../models/User');
const Buzz = require('../models/Buzzings');
const Profile = require('../models/Profile')

const createBuzz = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //Access to req.user.id because we logged in
    const user = await User.findById(req.user.id).select('-password');
    const profile = await Profile.findOne({ user: req.user.id });

    const newBuzz = new Buzz({
      text: req.body.text,
      name: user.name,
      avatar: profile.avatar,
      user: req.user.id,
    });

    await newBuzz.save();
    res.json(newBuzz);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteBuzz = async (req, res, next) => {
  try {
    const buzz = await Buzz.findById(req.params.bid);

    if (!buzz) {
      return res.status(401).json({ msg: 'Buzz not found' });
    }

    if (buzz.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await buzz.remove();
    res.json({ msg: 'Buzz removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getBuzzings = async (req, res, next) => {
  try {
    const buzzings = await Buzz.find();
    res.json(buzzings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const likeBuzz = async (req, res, next) => {
  try {
    const buzz = await Buzz.findById(req.params.bid);

    const isLiked = buzz.likes.filter(
      (like) => like.user.toString() === req.user.id
    );

    if (isLiked.length > 0) {
      return res.status(400).json({ msg: 'Buzz already liked' });
    }

    buzz.likes.unshift({ user: req.user.id });

    await buzz.save();
    res.json(buzz.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const unLikeBuzz = async (req, res, next) => {
  try {
    const buzz = await Buzz.findById(req.params.bid);

    const isLiked = buzz.likes.filter(
      (like) => like.user.toString() === req.user.id
    );

    if (isLiked.length === 0) {
      return res.status(400).json({ msg: 'Buzz has not yet been liked' });
    }

    const likeRemoveIndex = buzz.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    buzz.likes.splice(likeRemoveIndex, 1);

    res.json(buzz.likes);
    await buzz.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const createComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id).select('-password');
    const buzz = await Buzz.findById(req.params.bid);
    
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };
    
    buzz.comments.unshift(newComment);

    await buzz.save();
    res.json(buzz.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const buzz = await Buzz.findById(req.params.bid);

    const comment = buzz.comments.find(
      (comment) => comment.id === req.params.cid
    );

    if (!comment) {
      return res.status(400).json({ msg: 'Comment not found' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const commentRemoveIndex = buzz.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    buzz.comments.splice(commentRemoveIndex, 1);

    await buzz.save();
    res.json(buzz.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
module.exports = {
  createBuzz,
  getBuzzings,
  deleteBuzz,
  likeBuzz,
  unLikeBuzz,
  createComment,
  deleteComment,
};
