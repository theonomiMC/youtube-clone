import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // check if all fields are filled in
    if (!(email && password)) {
      return res.status(400).json({ message: "Please fill in all fields!" });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json("User already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    // console.log(newUser);
    const createdUser = await newUser.save();
    // sign the token
    const token = jwt.sign({ id: createdUser._id }, process.env.secret);
    // send the token in a HTTP-only cookie
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200);
    res.status(200).send("User has been created!");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(404, "Wrong credentials!"));
    const token = jwt.sign({ id: user._id }, process.env.secret);
    const { password, ...others } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};

// google auth
export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.secret);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = await User({
        ...req.body,
        googleUser: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.secret);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
