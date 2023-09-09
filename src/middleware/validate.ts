// middleware to validate request body

import { Request, Response, NextFunction } from "express";

const validateRequestBody =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parse(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({
        error,
      });
    }
  };

export default validateRequestBody;
