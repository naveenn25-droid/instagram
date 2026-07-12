import cors from "cors";
import { createApp, registerRoutes } from "./app.js";

const app = createApp();
const PORT = 3001;

app.use(cors());
registerRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
