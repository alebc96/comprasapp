import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import User from "../types/user";
const admin = require("firebase-admin");

export const createUser = async (req: Request, res: Response) => {
  if (!req.body?.name || !req.body.email || !req.body.password) {
    res.status(400).json({ msg: "Please introdue a valid user" });
  }
  const { name, email, password, role } = req.body;
  const activated = true;
  const newUser = new UserModel({ name, email, password, role, activated });
  try {
    const user = await newUser.save();
    res.status(201).send(user);
  } catch (error: any) {
    res.status(500).send(error);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    if (users) {
      res.status(200).send(users);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.query;
  try {
    const user = await UserModel.findById(userId);
    if (user) {
      return res.status(200).send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { userId } = req.query;
  try {
    const user = await UserModel.findByIdAndDelete(userId);
    if (user) {
      console.log("user deleted");
      return res.status(200).send(user);
    } else res.status(404).send("User not found");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  const { userId } = req.query;
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.findByIdAndUpdate(userId, {
      $set: { name, email, password },
    }).exec();
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const desactivateUser = async (req: Request, res: Response) => {
  const { userId } = req.query;
  try {
    const user = await UserModel.findByIdAndUpdate(userId, {
      $set: { activated: false },
    });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const activatedUser = async (req: Request, res: Response) => {
  const { userId } = req.query;
  try {
    const user = await UserModel.findByIdAndUpdate(userId, {
      $set: { activated: true },
    });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  const { userEmail } = req.query;
  try {
    const result = await UserModel.aggregate([
      {
        $match: {
          email: userEmail,
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).send(result);
    } else {
      return res.status(404).send({ msg: "User whit that email not found" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const login = async (req: Request, res: Response) => {
  console.log("starting login an user");
  const email = req.query.email;
  const password = req.query.password;
  let customToken = "";
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      res.status(404).send({ msg: "User not found" });
    } else {
      if (user.password !== password) {
        res.status(401).send({msg: 'Password is not correct'});
      }else{
        try {
            customToken = await admin.auth().createCustomToken(user.email);
            //res.status(200).send(customToken)
        } catch (error) {
            res.send('Error creting custom token')
        }
        user.customToken = customToken;
        res.status(200).json(user)
      }
    }
  } catch (error) {
        res.status(500).send(error)
  }
};
