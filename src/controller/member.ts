// member controller implementation

import Member from "@/model/member";
import { Request, Response } from "express";
import mongoose from "mongoose";

// create member controller
export const addMemberController = async (req: Request, res: Response) => {
  try {
    // get member data from request body
    const { community, user, role } = req.body;

    // create member instance from member model
    const member = new Member({ community, user, role });

    // save member in database
    const savedMember = await member.save();

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
    const { id } = req.params;

    // check if id is valid
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(400).send({
        status: false,
        content: {
          error: "Invalid member id",
        },
      });
    }

    // remove member from database
    const removedMember = await Member.findByIdAndRemove(id);

    // check if member exists
    if (!removedMember) {
      return res.status(404).send({
        status: false,
        content: {
          error: "Member not found",
        },
      });
    }

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
