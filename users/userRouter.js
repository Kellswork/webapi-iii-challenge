const express = require('express');
const db = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {});

router.post('/:id/posts', (req, res) => {});

router.get('/', async(req, res) => {
    const user = await db.get(req.params);
    res.status(200).json(user);
});

router.get('/:id', validateUserId, async (req, res) => {
  const user = await db.getById(req.params.id);
  res.status(200).json(user);
});

router.get('/:id/posts', validateUserId, async(req, res) => {
    const posts = await db.getUserPosts(req.params.id);
    res.status(200).json(posts);
});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

async function validateUserId(req, res, next) {
  const { id } = req.params;
  if (!Number(id)) {
    return res.status(400).json({ error: 'the id provieded is not a number' });
  }
  const user = await db.getById(id);
  if (!user) {
    return res.status(400).json({ message: 'invalid user id' });
  }
  next();
}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
