// user access middleware implementation

import Member from "@/model/member";
import Role from "@/model/role";
import MemberService from "@/services/member";
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

    // get if of community admin role
    const communityAdminRole = await Role.findOne({
      name: "Community Admin",
    });

    if (req.method === "POST") {
      // check if logged in user is allowed
      const { community } = req.body;

      const isAllowed = await Member.exists({
        user: loggedInUserId,
        community,
        role: communityAdminRole?._id,
      });

      if (!isAllowed) {
        return res.status(403).send({
          status: false,
          errors: {
            error: "You are not allowed to perform this action",
          },
        });
      }
    } else if (req.method === "DELETE") {
      // this is for the delete route

      const { memberId }: any = req.params;

      // find the community of the member
      const member = await MemberService.checkIfMemberExistsService(memberId);

      // check if logged in user is allowed
      const isAllowed = await Member.exists({
        user: loggedInUserId,
        community: member?.community,
        role: communityAdminRole?._id,
      });

      if (!isAllowed) {
        return res.status(403).send({
          status: false,
          errors: {
            error: "You are not allowed to perform this action",
          },
        });
      }
    }

    // if allowed, call next middleware
    return next();
  } catch (error: any) {
    return res.status(500).send({
      status: false,
      errors: {
        error: error.errors,
      },
    });
  }
};

export default userAccessCheck;
