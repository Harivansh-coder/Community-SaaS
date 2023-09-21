// contains all the community related services
//
// Path: src/services/community.ts

import Community, { ICommunity } from "@/model/community";
import Member, { IMember } from "@/model/member";
import { Request } from "express";
import Role from "@/model/role";
import mongoose from "mongoose";

class CommunityService {
  // create community service method
  public static createCommunityService = async (
    req: Request
  ): Promise<ICommunity> => {
    try {
      // get community data from request body
      const { name } = req.body;

      // generate slug from community name
      const slug = name.toLowerCase().split(" ").join("-");

      //   get owner id from request user
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

      // return the saved community
      return savedCommunity;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  // get all communities service method
  public static getAllCommunitiesService = async (
    page: number,
    limit: number
  ): Promise<{
    communities: ICommunity[];
    totalCommunities: number;
  }> => {
    try {
      // get total number of communities
      const totalCommunities = await Community.countDocuments({});

      // get total number of documents to skip
      const skip = (page - 1) * limit;

      // get all communities from database
      const communities = await Community.find({})
        .skip(skip)
        .limit(limit)
        .lean();

      // return the communities
      return { communities, totalCommunities };
    } catch (error: any) {
      throw new Error(error);
    }
  };

  // get all members of a community service method
  public static getAllMembersOfACommunityService = async (
    page: number,
    limit: number,
    communitySlug: string
  ): Promise<{
    allMembersOfCurrentCommunity: IMember[];
    totalMembersOfCurrentCommunity: number;
  }> => {
    try {
      // get total number of documents to skip
      const skip = (page - 1) * limit;

      // get community id from database
      const communityId = await Community.findOne({
        slug: communitySlug,
      }).lean();

      // check if community exists
      if (!communityId) {
        throw new Error("Community not found");
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

      // return the members
      return {
        allMembersOfCurrentCommunity,
        totalMembersOfCurrentCommunity,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };

  // get all communities owned by a user service method
  public static getAllCommunitiesOwnedByAUserService = async (
    page: number,
    limit: number,
    userId: string
  ): Promise<{
    myOwnedCommunities: ICommunity[];
    totalMyOwnedCommunities: number;
  }> => {
    try {
      // get total number of documents to skip
      const skip = (page - 1) * limit;

      // check if user id is valid
      if (!mongoose.isValidObjectId(userId)) {
        throw new Error("Invalid user id");
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

      // return the communities
      return { myOwnedCommunities, totalMyOwnedCommunities };
    } catch (error: any) {
      throw new Error(error);
    }
  };

  // get all my joined communities service method
  public static getAllMyJoinedCommunitiesService = async (
    page: number,
    limit: number,
    userId: string
  ): Promise<{
    myJoinedCommunities: ICommunity[];
    totalMyJoinedCommunities: number;
  }> => {
    try {
      // get total number of documents to skip
      const skip = (page - 1) * limit;

      // check if user id is valid
      if (!mongoose.isValidObjectId(userId)) {
        throw new Error("Invalid user id");
      }

      // get the list of all community id in which user is a member
      const myJoinedCommunitiesIds = await Member.find({
        user: userId,
      }).distinct("community");

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

      // return the communities
      return { myJoinedCommunities, totalMyJoinedCommunities };
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

export default CommunityService;
