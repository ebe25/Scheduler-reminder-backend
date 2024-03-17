import express, {urlencoded} from "express";
import dotenv from "dotenv";
import ApiRoutes from "./routes/index.js";
import {PORT} from "./config/serverConfig.js";
dotenv.config();
async function setupAndStartServer() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use("/api", ApiRoutes);
  app.listen(PORT, () => {
    console.log("Listening on port", PORT);
  });
}
setupAndStartServer();
