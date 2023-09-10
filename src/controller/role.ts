// role controller implementation

import Role from "@/model/role";
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
export const getAllRolesController = async (_req: Request, res: Response) => {
  try {
    // get all roles from database
    const roles = await Role.find({}).lean().exec();

    // send success response
    return res.status(200).send({
      status: true,
      content: {
        data: roles,
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
