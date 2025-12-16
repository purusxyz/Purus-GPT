  import { NextFunction, Request, Response } from "express";  
  import User from "../models/User.js";
  import { hash, compare } from 'bcrypt'
  import { createToken } from "../utils/token-manager.js";
  import { COOKIE_NAME } from "../utils/constants.js";
  
  export const isProd = process.env.NODE_ENV === "production";

    
  
  export const getAllUsers = async (

        req: Request,
        res: Response,
        next: NextFunction) => {
        try {
            // get all users
            const users = await User.find();
            return res.status(200).json({ message: "OK", users });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error", cause: error.message });
        }
    };


      export const userSignup = async (
        
        req: Request, 
        res: Response, 
        next: NextFunction
      ) => {
        try {
            // user signup 
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(401).send({ message: "User already exists" });
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

       
        //create token and store cookie
        res.clearCookie(COOKIE_NAME, {
           httpOnly: true,
        //    domain: "localhost",
           signed: true,
           path: "/",
           secure: isProd,
           sameSite: isProd ? "none" : "lax",
        });


         const token = createToken(user._id.toString(), user.email, "7d");
         const expires = new Date();
         expires.setDate(expires.getDate() + 7);
         res.cookie(COOKIE_NAME, token, { 
             path: "/",
            //  domain: "localhost",
             expires, 
             httpOnly: true,
             signed: true,
             secure: isProd,
             sameSite: isProd ? "none" : "lax",
           });


        return res.status(201).json({ message: "ok", name: user.name, email: user.email });
        } catch (error) {
            console.log(error);
            return res.status(200).json({ message: "Error", cause: error.message });
        }
    };



     export const userLogin = async (

        req: Request, 
        res: Response, 
        next: NextFunction) => {
        try {
            // user login 
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) { 
            return res.status(401).send({ message: "User not found" });
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send({ message: "Invalid password" });
        }

    
        //create token and store cookie
        res.clearCookie(COOKIE_NAME, {
           httpOnly: true,
        //    domain: "localhost",
           signed: true,
           path: "/",
           secure: isProd,
           sameSite: isProd ? "none" : "lax",
        });


         const token = createToken(user._id.toString(), user.email, "7d");
         const expires = new Date();
         expires.setDate(expires.getDate() + 7);
         res.cookie(COOKIE_NAME, token, { 
             path: "/",
            //  domain: "localhost",
             expires, 
             httpOnly: true,
             signed: true,
             secure: isProd,
             sameSite: isProd ? "none" : "lax",
           });


         return res.status(200).json({ message: "OK", name: user.name, email: user.email });
        } catch (error) {
            console.log(error);
            return res.status(200).json({ message: "Error", cause: error.message });
        }
    };



    export const verifyUser = async (
        
        req: Request, 
        res: Response, 
        next: NextFunction) => {
        try {
            // user check token
        
        const user = await User.findById(res.locals.jwtData.id );
        if (!user) { 
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
          console.log(user._id.toString(), res.locals.jwtData.id);

        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission denied" );
        }
        
         return res.status(200).json({ message: "OK", name: user.name, email: user.email  } );
        } catch (error) {
            console.log(error);
            return res.status(200).json({ message: "Error", cause: error.message });
        }
    };


    export const userLogout = async (
        
        req: Request, 
        res: Response, 
        next: NextFunction) => {
        try {
            // user check token
        
        const user = await User.findById(res.locals.jwtData.id );
        if (!user) { 
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
          console.log(user._id.toString(), res.locals.jwtData.id);

        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission denied" );
        }

        res.clearCookie(COOKIE_NAME, {
           httpOnly: true,
        //    domain: "localhost",
           signed: true,
           path: "/",
           secure: isProd,
           sameSite: isProd ? "none" : "lax",
        });

        
         return res.status(200).json({ message: "OK", name: user.name, email: user.email });
        } catch (error) {
            console.log(error);
            return res.status(200).json({ message: "Internal Server Error", cause: error.message });
        }
    };