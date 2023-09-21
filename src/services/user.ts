// contains all the user related services like login, signup, etc.

import User, { IUser } from "@/model/user";
import generateToken from "@/universe/v1/libraries/token";
import bcrypt from "bcrypt";
import { Request } from "express";

// user service class

class UserService {
  // user signup service
  public static userSignupService = async (
    req: Request
  ): Promise<{ user: IUser; token: string } | any> => {
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
      // return the newly created user and token
      return {
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
          created_at: user.createdAt,
        },
        token,
      };
    } catch (error: any) {
      throw error;
    }
  };

  // user login service
  public static userLoginService = async (
    req: Request
  ): Promise<{ token: string } | any> => {
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email }).lean();

    // check if user exists
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // check if password is valid
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // generate token
    const token = await generateToken(user._id);

    // return token
    return { token };
  };

  // get user profile service

  public static getUserProfileService = async (
    req: Request
  ): Promise<{ user: IUser } | any> => {
    try {
      const userID = req.user?.id;

      // get user from database
      const user = await User.findById(userID).lean();
      // check if user exists
      if (!user) {
        throw new Error("User not found");
      }

      // return user
      return {
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
          created_at: user.createdAt,
        },
      };
    } catch (error: any) {
      throw error;
    }
  };
}

export default UserService;
