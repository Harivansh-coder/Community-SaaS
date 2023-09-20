import "module-alias/register";
import server from "@/server";
import { envVariables } from "@/env";

// start the server
(async () => {
  // create express application instance and load all the basic middleware by calling server function
  const app = await server();

  // start the express server
  app.listen(envVariables.PORT, () =>
    console.log(`Server started at http://localhost:${envVariables.PORT}`)
  );
})();
