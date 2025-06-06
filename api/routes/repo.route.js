import express from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';
import axios from "axios";
import { ensureAuth } from "../middleware/authMiddleware.js";
import { repo, getRepoById, getPullRequests,getIssues,searchRepos } from "../controllers/repo.controller.js"

const router = express.Router();

router.get('/',ensureAuth, repo);
router.get('/:id', ensureAuth, getRepoById);
router.get('/:id/pull', ensureAuth, getPullRequests);
router.get('/:id/issues', ensureAuth, getIssues);
router.get('/search', ensureAuth, searchRepos);

export default router;