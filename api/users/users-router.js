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

router.post('/', validateUser, (req, res, next) => {
  User.insert( { name: req.name } )
    .then(newUser => {
      res.status(201).json(newUser)

    }).catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  User.update(req.params.is, { name: req.name })
    .then(updatedUser => {
      res.json(updatedUser)

    }) .then(user => {
      res.json(user)

    }).catch(next)
});

router.delete('/:id',  validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id

});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});


// do not forget to export the router
