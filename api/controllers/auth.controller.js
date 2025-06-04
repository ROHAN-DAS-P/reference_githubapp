import { errorHandler } from "../utils/error.js"
import passport from "passport"
import express from "express";
export const git = (req,res) => {
    res.json({
        message: 'test',
    })
}


export const home = (req,res) => {
    res.send(req.body);
}

export const repo = (req, res) => {
    res.sendFile(__dirname + "../client/src/pages/repo.jsx")
}

