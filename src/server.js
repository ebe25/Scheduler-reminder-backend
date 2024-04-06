import express, {urlencoded} from "express";
import dotenv from "dotenv";
import {PORT} from "./config/serverConfig.js";
import {createServer} from "http";
import {Server} from "socket.io";
import cors from "cors";
import prisma from "./config/serverConfig.js";
dotenv.config();

const createIfuserNotExists = async (data) => {
  try {
    const user = await prisma.user.upsert({
      where: {name: data.name, email: data.email},
      update: {isOnline: data.isOnline},
      create: {
        socketId: data.socketId,
        name: data.name,
        email: data.email,
        picture: data.picture,
        isOnline: data.isOnline,
      },
    });
    return user;
  } catch (error) {
    console.log("User exists in the db with same name and email", error);
  }
};

const listOfActiveUsers = async () => {
  try {
    const users = await prisma.user.findMany({where: {isOnline: true}});
    return users;
  } catch (error) {
    console.log("error while returing a list of online users", error);
  }
};
const findBySocketIdandUpdateOnlineStatus = async (id) => {
  try {
    const user = await prisma.user.updateMany({
      where: {socketId: id},
      data: {isOnline: false},
    });
    return user;
  } catch (error) {
    console.log("error while finding user mapped to the given socketID", error);
  }
};

const online_users = [];
async function setupAndStartServer() {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", async (socket) => {
    console.log("conntec user", socket.id)
    socket.on("login", (userData) => {
      const onlineUserData = {
        ...userData,
        isOnline: socket.connected,
        socketId: socket.id,
      };
      console.log("userDeatils", onlineUserData)
      createIfuserNotExists(onlineUserData).then(() => {
        online_users.push(onlineUserData.name);
        socket.broadcast.emit("active_users", online_users);
      });
    });

    socket.on("disconnect", async (data) => {
      console.log("dcecddd", data);
      online_users.pop();
      io.emit("active_users", online_users);
    });
  });

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(cors());
  // app.use("/api", ApiRoutes);

  server.listen(PORT, () => {
    console.log("Listening on port", PORT);
  });
}
setupAndStartServer();
