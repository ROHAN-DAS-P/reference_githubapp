import express from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';
import axios from "axios";
import { ensureAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/',ensureAuth, async (req, res) => {
    
  try {
    const response = await axios.get(`https://api.github.com/user/repos`, {
      headers: { Authorization: `token ${req.user.accessToken}` },
    });
    res.json(response.data);
  } catch (err) {
    console.error('GitHub API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Error fetching repos' });
  }
});

export default router;