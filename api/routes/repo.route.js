import express from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`https://api.github.com/user/repos`, {
      headers: { Authorization: `token ${req.user.accessToken}` },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching repos' });
  }
});

export default router;