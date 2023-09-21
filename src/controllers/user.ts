// controller for user routes
import { Request, Response } from "express";
import UserService from "@/services/user";

// user signup controller
export const userSignupController = async (req: Request, res: Response) => {
  // signup logic
  try {
    const { user, token } = await UserService.userSignupService(req);

    // send response
    return res.status(201).send({
      status: true,
      content: {
        data: user,
        meta: {
          access_token: token,
        },
      },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).send({
        status: false,
        errors: {
          error: "User with this email already exists",
        },
      });
    } else {
      return res.status(500).send({
        status: false,
        errors: {
          error: error.errors,
        },
      });
    }
  }
};

// user login controller
export const userLoginController = async (req: Request, res: Response) => {
  // signin logic
  try {
    // using userLoginService from UserService class
    const { token } = await UserService.userLoginService(req);

    // send response
    return res.status(200).send({
      status: true,
      content: {
        access_token: token,
        token_type: "Bearer",
      },
    });
  } catch (error: any) {
    return res.status(500).send({
      status: false,
      errors: {
        error: error.message,
      },
    });
  }
};

// user profile controller
export const getUserProfileController = async (req: Request, res: Response) => {
  // get user profile
  try {
    // get user from database
    const userProfile = await UserService.getUserProfileService(req);

    // send response
    return res.status(200).send({
      status: true,
      content: {
        data: userProfile,
      },
    });
  } catch (error: any) {
    return res.status(500).send({
      status: false,
      errors: {
        error: error.message,
      },
    });
  }
};
