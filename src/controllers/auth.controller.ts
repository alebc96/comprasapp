import { Request, Response } from "express";

// singup
export const signup = (req: Request, res: Response) => {
    if(!req.body. email || !req.body.password){
        return res.status(422).json({
            email: "email is reqired",
            password: "password is required"
        });
    }
}