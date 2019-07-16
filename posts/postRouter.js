const express = require('express');
const db = require('./postDb');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await db.get();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', validatePostId, async (req, res) => {
  try {
    const post = await db.getById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'server could not get post' });
  }
});

router.delete('/:id', validatePostId, async (req, res) => {
  try {
    const deletedpost = await db.remove(req.params.id);
    res.status(200).json(deletedpost);
  } catch (error) {
    res.status(500).json({ error: 'server could not delete post' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedpost = await db.update(req.params.id, req.body);
    const post = await db.getById(req.params.id);
    res.status(200).json(post);
   } catch (error) {
       res.status(500).json({error: error.message})
   }
});

// custom middleware

async function validatePostId(req, res, next) {
  const { id } = req.params;
  if (!Number(id)) {
    return res.status(400).json({ error: 'the id provided is not a number' });
  }
  const post = await db.getById(id);
  if (!post) {
    return res.status(400).json({ message: 'invalid post id' });
  }
  next();
}

module.exports = router;
