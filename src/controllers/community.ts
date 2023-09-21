// community controller implementation
import CommunityService from "@/services/community";
import { paginationQuery } from "@/universe/v1/libraries/pagination";
import { Request, Response } from "express";

// create community controller
export const createCommunityController = async (
  req: Request,
  res: Response
) => {
  try {
    // saving community in database using community service
    const savedCommunity = await CommunityService.createCommunityService(req);
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

    // get all communities from database
    const { communities, totalCommunities } =
      await CommunityService.getAllCommunitiesService(page, limit);

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
export const getAllMembersController = async (req: Request, res: Response) => {
  try {
    // parse pagination query
    const parsedPaginationQuery = paginationQuery.parse(req.query);

    // get page and limit from parsed query
    const { page, limit } = parsedPaginationQuery;

    // get all community members from database and total number of members
    const { allMembersOfCurrentCommunity, totalMembersOfCurrentCommunity } =
      await CommunityService.getAllMembersOfACommunityService(
        page,
        limit,
        req.params.communitySlug!
      );

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

    // get all my owned communities from database and total number of my owned communities
    const { myOwnedCommunities, totalMyOwnedCommunities } =
      await CommunityService.getAllCommunitiesOwnedByAUserService(
        page,
        limit,
        req.user?.id!
      );

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

    // get user id from request object
    const userId = req.user?.id;

    // get all my joined communities from database and total number of my joined communities
    const { myJoinedCommunities, totalMyJoinedCommunities } =
      await CommunityService.getAllMyJoinedCommunitiesService(
        page,
        limit,
        userId!
      );

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
