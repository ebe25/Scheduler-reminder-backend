import express, {urlencoded} from "express";
import dotenv from "dotenv";
import ApiRoutes from "./routes/index.js";
import {PORT} from "./config/serverConfig.js";
import {createServer} from "http";
import {Server} from "socket.io";
import cors from "cors";

dotenv.config();
async function setupAndStartServer() {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    socket.on("login", function (data) {
      console.log("a user " + data.userId + " connected");    
    });
  });

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(cors());
  app.use("/api", ApiRoutes);


  server.listen(PORT, () => {
    console.log("Listening on port", PORT);
  });
}
setupAndStartServer();
