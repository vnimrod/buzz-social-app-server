const express = require('express');
const { check } = require('express-validator');

const auth = require('../../middlware/auth');
const buzzController = require('../../controllers/buzzings');

const router = express.Router();

// @route         POST /buzzings
// @description   Create new Buzz

router.post(
  '/',
  [auth, [check('text', 'Buzzing text is required').not().isEmpty()]],
  buzzController.createBuzz
);

// @route         Delete /buzzings/:bid
// @description   Delete a buzz

router.delete('/:bid', auth, buzzController.deleteBuzz);

// @route         Get /buzzings
// @description   Get all buzzings

router.get('/', auth, buzzController.getBuzzings);
// router.get('/', buzzController.getBuzzings);

// @route         Put /buzzings/like/:bid
// @description   Like a buzz

router.put('/like/:bid', auth, buzzController.likeBuzz);

// @route         Put /buzzings/like/:bid
// @description   unLike a buzz that already been liked by auth user

router.put('/unlike/:bid', auth, buzzController.unLikeBuzz);

// @route         post /buzzings/comment/:bid'
// @description   Create new comment

router.post(
  '/comment/:bid',
  [auth, [check('text', 'Comment text is required').not().isEmpty()]],
  buzzController.createComment
);

router.delete('/comment/:bid/:cid', auth, buzzController.deleteComment)

module.exports = router;
