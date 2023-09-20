// community controller implementation

import Community from "@/model/community";
import Member from "@/model/member";
import Role from "@/model/role";
import { paginationQuery } from "@/universe/v1/libraries/pagination";
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
  req: Request,
  res: Response
) => {
  try {
    // parse pagination query
    const parsedPaginationQuery = paginationQuery.parse(req.query);

    // get page and limit from parsed query
    const { page, limit } = parsedPaginationQuery;

    // get total number of documents to skip
    const skip = (page - 1) * limit;

    // get all communities from database and populate owner name
    const communities = await Community.find({})
      .populate("owner", "name")
      .skip(skip)
      .limit(limit)
      .lean();

    // get total number of communities
    const totalCommunities = await Community.countDocuments({});

    // send success response
    return res.status(200).send({
      status: true,
      content: {
        meta: {
          total: totalCommunities,
          pages: Math.ceil(totalCommunities / limit),
          page,
        },
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
    // parse pagination query
    const parsedPaginationQuery = paginationQuery.parse(_req.query);

    // get page and limit from parsed query
    const { page, limit } = parsedPaginationQuery;

    // get total number of documents to skip
    const skip = (page - 1) * limit;

    // get community slug from request params

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
      .skip(skip)
      .limit(limit)
      .lean();

    // get total number of members of a community
    const totalMembersOfCurrentCommunity = await Member.countDocuments({
      community: communityId,
    });

    // send success response
    return res.status(200).send({
      status: true,
      content: {
        meta: {
          total: totalMembersOfCurrentCommunity,
          pages: Math.ceil(totalMembersOfCurrentCommunity / limit),
          page,
        },
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
    // parse pagination query
    const parsedPaginationQuery = paginationQuery.parse(req.query);

    // get page and limit from parsed query
    const { page, limit } = parsedPaginationQuery;

    // get total number of documents to skip
    const skip = (page - 1) * limit;

    // get user id from request object
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
    const myOwnedCommunities = await Community.find({ owner: userId })
      .skip(skip)
      .limit(limit)
      .lean();

    // get total number of my owned communities
    const totalMyOwnedCommunities = await Community.countDocuments({
      owner: userId,
    });

    // send success response
    return res.status(200).send({
      status: true,
      content: {
        meta: {
          total: totalMyOwnedCommunities,
          pages: Math.ceil(totalMyOwnedCommunities / limit),
          page,
        },
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
    // parse pagination query
    const parsedPaginationQuery = paginationQuery.parse(req.query);

    // get page and limit from parsed query
    const { page, limit } = parsedPaginationQuery;

    // get total number of documents to skip
    const skip = (page - 1) * limit;

    // get user id from request object
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
      .skip(skip)
      .limit(limit)
      .lean();

    // get total number of my joined communities
    const totalMyJoinedCommunities = await Community.countDocuments({
      _id: { $in: myJoinedCommunitiesIds },
    });

    // send success response
    return res.status(200).send({
      status: true,
      content: {
        meta: {
          total: totalMyJoinedCommunities,
          pages: Math.ceil(totalMyJoinedCommunities / limit),
          page,
        },
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
