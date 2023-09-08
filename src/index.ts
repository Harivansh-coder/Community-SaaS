import express from "express";

// create a new express application instance
const app: express.Application = express();

// define a route handler for the default home page
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello " + req.query.name);
});

// start the Express server
app.listen(3000, () => {
  console.log("server started at http://localhost:3000");
});
