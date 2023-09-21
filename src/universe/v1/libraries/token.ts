// token utility function to generate token

import jwt from "jsonwebtoken";
import { envVariables } from "@/env";

// generate token with userID as payload
const generateToken = (userID: string): string => {
  const token = jwt.sign(
    {
      id: userID,
    },
    envVariables.JWT_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

export default generateToken;
