import express from 'express';
import JWT from "jsonwebtoken";

const verifyToken =  (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const token = req.header('auth-token');
    if(!token) res.status(401).send("Access Denied").end();

    try{
        // @ts-ignore
        req.user = JWT.verify(token, process.env.TOKEN_SECRET);
    }catch (e) {
        res.status(400).send("invalid token").end()
    }

    next();
};

export = verifyToken;