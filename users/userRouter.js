const express = require('express');
const db = require('./userDb');
const postDb = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
  const user = await db.insert(req.body);
  res.status(200).json(user);
});

router.post('/:id/posts', validatePost, async (req, res) => {
    const post = await postDb.insert(req.body);
  res.status(200).json(post);
});

router.get('/', async (req, res) => {
  const user = await db.get(req.params);
  res.status(200).json(user);
});

router.get('/:id', validateUserId, async (req, res) => {
  const user = await db.getById(req.params.id);
  res.status(200).json(user);
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  const posts = await db.getUserPosts(req.params.id);
  res.status(200).json(posts);
});

router.delete('/:id', validateUserId, async (req, res) => {
  const deletedUser = await db.remove(req.params.id);
  res.status(200).json(deletedUser);
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
   try {
    const updatedUser = await db.update(req.params.id, req.body);
    const user = await db.getById(req.params.id);
    res.status(200).json(user);
   } catch (error) {
       res.status(500).json({error: error.message})
   }
});

//custom middleware

async function validateUserId(req, res, next) {
 // req.user
  const { id } = req.params;
  if (!Number(id)) {
    return res.status(400).json({ error: 'the id provided is not a number' });
  }
  const user = await db.getById(id);
  if (!user) {
    return res.status(400).json({ message: 'invalid user id' });
  }
  next();
}

function validateUser(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ message: 'missing user data' });
  } else if (req.body.name === '' || req.body.name.length < 3) {
    return res.status(400).json({ message: 'missing required name field' });
  }
  next();
}

function validatePost(req, res, next) {
    if (!req.body.text) {
        return res.status(400).json({ message: "missing post data" });
    } else if (req.body.text === '' || req.body.text.length < 3 ) {
    return res.status(400).json({ message: "missing required text field" });
  }
  next();
}

module.exports = router;
