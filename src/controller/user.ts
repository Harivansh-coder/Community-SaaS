// controller for user routes
import User from "@/model/user";
import generateToken from "@/utility/token";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

// user signup controller
export const userSignupController = async (req: Request, res: Response) => {
  // signup logic
  try {
    const { name, email, password } = req.body;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user to database
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // save user to database
    await user.save();

    // generate token
    const token = await generateToken(user._id);

    // send response
    return res.status(201).send({
      status: true,
      content: {
        data: {
          name: user.name,
          email: user.email,
          id: user._id,
          created_at: user.createdAt,
        },
        meta: {
          access_token: token,
        },
      },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).send({
        status: false,
        content: {
          error: "User with this email already exists",
        },
      });
    } else {
      return res.status(500).send({
        status: false,
        content: {
          error: error.message,
        },
      });
    }
  }
};

// user login controller
export const userLoginController = async (req: Request, res: Response) => {
  // signin logic
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean();

    // check if user exists
    if (!user) {
      return res.status(400).send({
        status: false,
        content: {
          message: "Invalid credentials",
        },
      });
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // check if password is valid
    if (!isPasswordValid) {
      return res.status(400).send({
        status: false,
        content: {
          message: "Invalid credentials",
        },
      });
    }

    // generate token
    const token = await generateToken(user._id);

    // send response
    return res.status(200).send({
      status: true,
      content: {
        "access-token": token,
        "token-type": "Bearer",
      },
    });
  } catch (error: any) {
    return res.status(500).send({
      status: false,
      content: {
        error: error.message,
      },
    });
  }
};

// user profile controller
export const getUserProfileController = async (req: Request, res: Response) => {
  // get user profile
  try {
    const userID = req.user?.id;

    // get user from database
    const user = await User.findById(userID).lean();
    // check if user exists
    if (!user) {
      return res.status(404).send({
        status: false,
        content: {
          message: "User not found",
        },
      });
    }

    // send response
    return res.status(200).send({
      status: true,
      content: {
        data: {
          name: user.name,
          email: user.email,
          id: user._id,
          created_at: user.createdAt,
        },
      },
    });
  } catch (error: any) {
    return res.status(500).send({
      status: false,
      content: {
        error: error.message,
      },
    });
  }
};
