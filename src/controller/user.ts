// controller for user routes

import express from "express";

// user signup controller
export const userSignupController = async (
  req: express.Request,
  res: express.Response
) => {
  console.log(req.body);

  res.send("User signup");
};

// user login controller
export const userLoginController = async (
  req: express.Request,
  res: express.Response
) => {
  console.log(req.body);
  res.send("User login");
};

// user profile controller
export const getUserProfileController = async (
  req: express.Request,
  res: express.Response
) => {
  console.log(req.body);
  res.send("User profile");
};
