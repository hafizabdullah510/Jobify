import { StatusCodes } from "http-status-codes";
import User from "../model/User.js";
import { BadRequest, Unauthorized, NotFoundError } from "../errors/index.js";
import { addCookiesToResponse } from "../serverUtils/addCookiesToResponse.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    throw new BadRequest("Please provide all the values");
  }
  const alreadyExists = await User.findOne({ email });
  if (alreadyExists) {
    throw new BadRequest("User Already Exists");
  }

  const user = await User.create({ name, email, password });

  const token = user.createJWT();

  //cookie
  addCookiesToResponse({ res, token });

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      location: user.location,
      lastName: user.lastName,
    },
    location: user.location,
  });
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide all the values");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Unauthorized("Invalid Credentials");
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new Unauthorized("Invalid Credentials");
  }

  //create token
  const token = user.createJWT();

  // we don't want password in response
  user.password = undefined;

  //cookie
  addCookiesToResponse({ res, token });
  res.status(StatusCodes.OK).json({ user, location: user.location });
};
export const updateUser = async (req, res) => {
  const { name, email, lastName, location } = req.body;
  if (!name || !email || !lastName || !location) {
    throw new BadRequest("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new NotFoundError("User does not exists");
  }

  user.name = name;
  user.email = email;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = await user.createJWT(); // Not required here but will generate same token as user id is still same

  //cookie
  addCookiesToResponse({ res, token });

  res.status(StatusCodes.OK).json({
    user,
    location: user.location,
  });
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user, location: user.location });
};

export const logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User Logged Out!" });
};
