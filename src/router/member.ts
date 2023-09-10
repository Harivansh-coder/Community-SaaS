// member router implementation

import express from "express";

// express router instance
const memberRouter = express.Router();

// create member route
memberRouter.post("/", createMemberController);

// remove member route
memberRouter.delete("/:id", removeMemberController);

export default memberRouter;
