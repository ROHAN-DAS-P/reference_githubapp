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
        const token = jwt.sign({ id: req.user.id, username: req.user.username,accessToken: req.user.accessToken, }, process.env.JWT_SECRET, { expiresIn: '1m' });
        res.cookie('access_token',token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Lax',
            maxAge: 1 * 60 * 1000,
        });
        res.redirect(`http://localhost:5173/home`);
    } catch (error) {
        if (!res.headersSent) next(error);
    }
}


export const home = (req,res) => {
    res.send(req.body);
}



export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json({ success: true, message: 'User signed out successfully' });
    } catch (error) {
        if (!res.headersSent) next(error);
    }
    
}