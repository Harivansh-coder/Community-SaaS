// user access middleware implementation

import Member from "@/model/member";
import Role from "@/model/role";
import { Request, Response, NextFunction } from "express";

// user access middleware
const userAccessCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get user from request object
    const loggedInUserId = req.user?.id;

    // check if logged in user is allowed
    const { community } = req.body;

    // get if of community admin role
    const communityAdminRole = await Role.findOne({
      name: "Community Admin",
    });

    const isAllowed = await Member.findOne({
      community,
      user: loggedInUserId,
      role: communityAdminRole?._id,
    });

    if (!isAllowed) {
      return res.status(403).send({
        status: false,
        content: {
          error: "You are not allowed to perform this action",
        },
      });
    }

    // if allowed, call next middleware
    return next();
  } catch (error: any) {
    return res.status(500).send({
      status: false,
      content: {
        error: error.message,
      },
    });
  }
};

export default userAccessCheck;
