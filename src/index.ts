import "module-alias/register";
import server from "@/server";
import { envVariables } from "@/env";
import CustomLogger from "@/universe/v1/libraries/logger";

// start the server
(async () => {
  // create express application instance and load all the basic middleware by calling server function
  const app = await server();

  // start the express server
  app.listen(envVariables.PORT, () =>
    CustomLogger.instance.info(`Server started on port ${envVariables.PORT}`)
  );
})();
