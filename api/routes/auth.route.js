import express from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';
import { git, home, repo } from "../controllers/auth.controller.js";

const router = express.Router();

router.get('/git',git);
router.get('/', home);
router.get('/repo',repo);
router.get('/github', passport.authenticate('github', { scope: ['user', 'repo'] }));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  const token = jwt.sign({ id: req.user.id, username: req.user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.redirect(`http://localhost:5173/home`);
});




export default router;