import express from "express";
import User from "../../models/User";
import RegisterValidation from "../validators/Register";
import LoginValidation from "../validators/Login";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";

class AuthController{
    register = async (req:express.Request, res:express.Response):Promise<any> =>{
        try{
            // validate request body
            await RegisterValidation.validateAsync(req.body);

            // check if email already exists
            const emailExist = await User.findOne({email: req.body.email});
            if(emailExist){ res.status(400).json({data:{error:"Email already exists"}})}

            // Hash passwords
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            // replace password in request object
            let user = req.body;
            user.password = hashPassword;

            // register use and output registered user
            const savedUser = await new User(user).save();
            res.json({data: savedUser});

        }catch (e) {
            res.status(400).json({error: e.toString()});
        }
    };

    login = async (req:express.Request, res:express.Response):Promise<any> =>{
        try{
            // validate request body
            await LoginValidation.validateAsync(req.body);

            // check if email already exists
            const user = await User.findOne({email: req.body.email});
            if(!user){ res.status(400).json({data:{error:"Email or password incorrect"}});}

            // check if password is correct
            // @ts-ignore
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if(!validPass) res.status(400).send({data:{error:"Email or password incorrect"}});

            // create and assign a token
            const token = JWT.sign({_id: user._id}, process.env.TOKEN_SECRET);
            res.header("auth-token", token).send(token);
        }catch (e) {
            res.status(400).json({error: e.toString()});
        }
    };
}

export = AuthController;

