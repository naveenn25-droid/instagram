import serverless from "serverless-http";
import { createApp, registerRoutes } from "../../server/app.js";

const app = createApp();
registerRoutes(app);

export const handler = serverless(app);
