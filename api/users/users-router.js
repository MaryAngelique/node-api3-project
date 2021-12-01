const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const User = require("./users-model");
const Post = require("../posts/posts-model");

const { validateUserId, validateUser, validatePost } = require("../middleware/middleware");
const router = express.Router();

router.get('/', (req, res, next) => {
  User.get()
    .then(users => {
      res.json(users)

    }).catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user);
});

router.post('/', validateUser, (req, res) => {
  User.insert(req.body)
    .then(newUser => {
      res.status(200).json(newUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error adding the user'});
    });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  User.update(req.params.id, req.body)
    .then(updatedUser => {
      res.status(200).json(updatedUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error updating the user'});
    });
});

router.delete('/:id',  validateUserId, async (req, res, next) => {
  try{
    await User.remove(req.params.id)
    res.json(req.user)

  } catch (error) {
    next(error);
  }

});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try{
    const result = await User.getUserPosts(req.params.id)
    res.json(result)

  } catch (error) {
    next(error);
  }
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  req.body.user_id = req.params.id; 
  Post.insert(req.body)
    .then(newPost => {
      res.status(200).json(newPost);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: 'There was an error adding the post'});
    });
});

// router.use((error, req, res, next) => {
//   res.status(error.status || 500).json( { customMessage: "Router not working",
//     message: error.message,
//     stack: error.stack,
//  } )
// })

// do not forget to export the router
module.exports = router;