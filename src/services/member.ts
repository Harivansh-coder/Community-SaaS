// contains all the services for the member controller.
//

import { IMember } from "@/model/member";
import { Request } from "express";
import Member from "@/model/member";
import mongoose from "mongoose";

class MemberService {
  // add member service method
  public static addMemberService = async (req: Request): Promise<IMember> => {
    try {
      // get member data from request body
      const { community, user, role } = req.body;

      // create member instance from member model
      const member = new Member({ community, user, role });

      // check if member already exists
      const existingMember = await Member.findOne({
        community,
        user,
        role,
      });

      if (existingMember) {
        throw new Error("Member already exists");
      }

      // save member in database
      const savedMember = await member.save();

      // return the saved member
      return savedMember;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  //   remove member service method
  public static removeMemberService = async (req: Request): Promise<void> => {
    try {
      // get member id from request params
      const { memberId } = req.params;

      // check if id is valid
      if (!memberId || !mongoose.isValidObjectId(memberId)) {
        throw new Error("Invalid member id");
      }

      // remove member from database
      await Member.findByIdAndRemove(memberId);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  //   check if member exists service method
  public static checkIfMemberExistsService = async (
    memberID: string
  ): Promise<IMember> => {
    try {
      // check if member exists
      const member = await Member.findById(memberID);

      //   check if member exists
      if (!member) {
        throw new Error("Member not found");
      }

      // return the member
      return member;
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

export default MemberService;
