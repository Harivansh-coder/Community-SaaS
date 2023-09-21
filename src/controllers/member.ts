// member controller implementation

import MemberService from "@/services/member";
import { Request, Response } from "express";

// create member controller
export const addMemberController = async (req: Request, res: Response) => {
  try {
    // add member using addMemberService
    const savedMember = await MemberService.addMemberService(req);

    // send success response
    return res.status(201).send({
      status: true,
      content: {
        data: savedMember,
      },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).send({
        status: false,
        content: {
          error: "Member already exists",
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

// remove member controller
export const removeMemberController = async (req: Request, res: Response) => {
  try {
    // remove member using removeMemberService
    await MemberService.removeMemberService(req);

    // send success response
    return res.status(200).send({
      status: true,
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
