// community controller implementation

import Community from "@/model/community";
import Member from "@/model/member";
import Role from "@/model/role";
import { Request, Response } from "express";
import mongoose from "mongoose";

// create community controller
export const createCommunityController = async (
  req: Request,
  res: Response
) => {
  try {
    // get community data from request body
    const { name } = req.body;

    const slug = name.toLowerCase().split(" ").join("-");

    const owner = req.user?.id;

    // create community instance from community model
    const community = new Community({ name, slug, owner });

    // save community in database
    const savedCommunity = await community.save();

    // get the admin role id
    const adminRoleId = await Role.findOne({ name: "Community Admin" });

    // add current user as community admin
    const newMember = new Member({
      community: savedCommunity._id,
      user: owner,
      role: adminRoleId?._id,
    });

    // save member in database
    await newMember.save();

    // send success response
    return res.status(201).send({
      status: true,
      content: {
        data: savedCommunity,
      },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).send({
        status: false,
        content: {
          error: "Community already exists",
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

// get all communities controller
export const getAllCommunitiesController = async (
  _req: Request,
  res: Response
) => {
  try {
    // get all communities from database and populate owner name
    const communities = await Community.find({})
      .populate("owner", "name")
      .lean();

    // send success response
    return res.status(200).send({
      status: true,
      content: {
        data: communities,
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

// get all members of a community controller
export const getAllMembersController = async (_req: Request, res: Response) => {
  try {
    const communitySlug = _req.params.id;

    // get community id from database
    const communityId = await Community.findOne({ slug: communitySlug }).lean();

    // check if community exists
    if (!communityId) {
      return res.status(404).send({
        status: false,
        errors: {
          message: "Community not found",
        },
      });
    }

    // get all members of a community from database
    const allMembersOfCurrentCommunity = await Member.find({
      community: communityId,
    })
      .populate("user", "name")
      .populate("role", "name")
      .lean();

    // send success response
    return res.status(200).send({
      status: true,
      content: {
        data: allMembersOfCurrentCommunity,
      },
    });
  } catch (error: any) {
    return res.status(500).send({
      status: false,
      errors: {
        message: error.message,
      },
    });
  }
};

// get all my owned communities controller
export const getMyOwnedCommunitiesController = async (
  req: Request,
  res: Response
) => {
  // get all my owned communities from database
  try {
    const userId = req.user?.id;

    // check if user id is valid
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).send({
        status: false,
        errors: {
          message: "Invalid user id",
        },
      });
    }

    // get all my owned communities from database
    const myOwnedCommunities = await Community.find({ owner: userId }).lean();

    // send success response
    return res.status(200).send({
      status: true,
      content: {
        data: myOwnedCommunities,
      },
    });
  } catch (error: any) {
    return res.status(500).send({
      status: false,
      errors: {
        message: error.message,
      },
    });
  }
};

// get all my joined communities controller
export const getMyJoinedCommunitiesController = async (
  req: Request,
  res: Response
) => {
  // get all my joined communities from database
  try {
    const userId = req.user?.id;

    // check if user id is valid
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).send({
        status: false,
        errors: {
          message: "Invalid user id",
        },
      });
    }

    // get the list of all community id in which user is a member
    const myJoinedCommunitiesIds = await Member.find({ user: userId }).distinct(
      "community"
    );

    // get all my joined communities from database
    const myJoinedCommunities = await Community.find({
      _id: { $in: myJoinedCommunitiesIds },
    })
      .populate("owner", "name")
      .lean();

    // send success response
    return res.status(200).send({
      status: true,
      content: {
        data: myJoinedCommunities,
      },
    });
  } catch (error: any) {
    return res.status(500).send({
      status: false,
      errors: {
        message: error.message,
      },
    });
  }
};
