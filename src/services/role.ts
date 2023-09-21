// contains all the services for the role controller.

import Role, { IRole } from "@/model/role";
import { Request } from "express";

// Path: src/services/role.ts

class RoleService {
  // create role service method
  public static createRoleService = async (req: Request): Promise<IRole> => {
    try {
      // get role data from request body
      const { name } = req.body;

      // create role instance from role model
      const role = new Role({ name });

      // save role in database
      const savedRole = await role.save();

      // return the saved role
      return savedRole;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  // get all roles service method
  public static getAllRolesService = async (
    page: number,
    limit: number
  ): Promise<{ roles: IRole[]; totalRoles: number }> => {
    try {
      // get total number of roles
      const totalRoles = await Role.countDocuments({});

      // get total number of documents to skip
      const skip = (page - 1) * limit;

      // get all roles from database
      const roles = await Role.find({}).skip(skip).limit(limit).lean();

      // return the roles
      return { roles, totalRoles };
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

export default RoleService;
