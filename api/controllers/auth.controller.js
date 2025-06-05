import { errorHandler } from "../utils/error.js"
import passport from "passport"
import express from "express";
import jwt from "jsonwebtoken";


export const git = (req,res) => {
    res.json({
        message: 'test',
    })
}

export const github_callback = async (req, res, next) => {
    try {
        const token = jwt.sign({ id: req.user.id, username: req.user.username,accessToken: req.user.accessToken, }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('access_token',token, {httpOnly: true, secure: process.env.NODE_ENV === 'production',});
        res.redirect(`http://localhost:5173/home`);
    } catch (error) {
        next(error);
    }
}


export const home = (req,res) => {
    res.send(req.body);
}

export const repo = (req, res) => {
    res.sendFile(__dirname + "../client/src/pages/repo.jsx")
}

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User signed out successfully');
    } catch (error) {
        next(error);
    }
    
}