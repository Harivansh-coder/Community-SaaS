// auth middleware to check if user is authenticated

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVariables } from "@/env";

type JWTPayload = JwtPayload & {
  id: string;
};

const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get access token from header
  const accessToken = req.headers.authorization?.split(" ")[1];

  // check if access token exists
  if (!accessToken) {
    return res.status(401).send({
      status: false,
      content: {
        message: "Unauthorized",
      },
    });
  }

  // verify access token
  try {
    const decodedToken = (await jwt.verify(
      accessToken,
      envVariables.JWT_SECRET_KEY
    )) as JWTPayload;

    // check if decoded token is a string
    if (typeof decodedToken !== "string") {
      req.user = decodedToken;
    }

    return next();
  } catch (error: any) {
    return res.status(401).send({
      status: false,
      content: {
        message: "Unauthorized",
      },
    });
  }
};

export default verifyAccessToken;
