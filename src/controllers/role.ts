// contains all the controllers for the role controller.

import Role from "@/model/role";
import RoleService from "@/services/role";
import { paginationQuery } from "@/universe/v1/libraries/pagination";
import { Request, Response } from "express";

// create role controller
export const createRoleController = async (req: Request, res: Response) => {
  try {
    // get role data from request body
    const { name } = req.body;

    // create role instance from role model
    const role = new Role({ name });

    // save role in database
    const savedRole = await role.save();

    // send success response
    return res.status(201).send({
      status: true,
      content: {
        data: savedRole,
      },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).send({
        status: false,
        content: {
          error: "Role already exists",
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

// get all roles controller
export const getAllRolesController = async (req: Request, res: Response) => {
  try {
    // parse pagination query
    const parsedPaginationQuery = paginationQuery.parse(req.query);

    // get page and limit from parsed query
    const { page, limit } = parsedPaginationQuery;

    // get all roles from database using getAllRolesService
    const { roles, totalRoles } = await RoleService.getAllRolesService(
      page,
      limit
    );

    // send success response
    return res.status(200).send({
      status: true,
      content: {
        meta: {
          total: totalRoles,
          pages: Math.ceil(totalRoles / limit),
          page,
        },
        data: roles,
      },
    });
  } catch (error: any) {
    return res.status(500).send({
      status: false,
      errors: {
        error: error.errors,
      },
    });
  }
};
