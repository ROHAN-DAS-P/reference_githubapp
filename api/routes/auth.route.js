import express from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';
import { git, home, repo, github_callback, signOut } from "../controllers/auth.controller.js";

const router = express.Router();

router.get('/git',git);
router.get('/', home);
router.get('/repo',repo);
router.get('/github', passport.authenticate('github', { scope: ['user', 'repo'] }));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), github_callback);
router.get('/signout',signOut)




export default router;