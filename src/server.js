import express, {urlencoded} from "express";
import dotenv from "dotenv";
import ApiRoutes from "./routes/index.js";
import {PORT} from "./config/serverConfig.js";
import {createServer} from "http";
import {Server} from "socket.io";
import cors from "cors";
import UserRepositary from "./repositary/UserRepo.js";
import prisma from "./config/serverConfig.js";
dotenv.config();

const createIfuserNotExists = async (data) => {
  try {
    const user = await prisma.user.upsert({
      where: {name: data.name, email: data.email},
      update: {isOnline: data.isOnline},
      create: {
        name: data.name,
        email: data.email,
        picture: data.picture,
        isOnline: data.isOnline,
      },
    });
    console.log("userscreatedifnotexits", user);
    return user;
  } catch (error) {
    console.log("User exists in the db with same name and email", error);
  }
};

// const createUser = async (data) => {
//   try {
//     const newUser = await prisma.user.create({
//       data: data,
//     });
//     return newUser;
//   } catch (error) {
//     console.log("New user in Db creation error", error);
//   }
// };

const listOfActiveUsers = async () => {
  try {
    const users = await prisma.user.findMany({where: {isOnline: true}});
    return users;
  } catch (error) {
    console.log("error while returing a list of online users", error);
  }
};

async function setupAndStartServer() {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", async (socket) => {
    console.log("user made a connectino ");
    socket.on("login", (userData) => {
      const onlineUserData = {...userData, isOnline: socket.connected};
      console.log("A user logged in:", onlineUserData);

      createIfuserNotExists(onlineUserData).then(() =>
        listOfActiveUsers().then((activeUsers) => {
          socket.emit("active_users", activeUsers);
        })
      );
    });

    const onlineUsers = await listOfActiveUsers();
    if (onlineUsers.length > 0) {
      socket.emit("active_users", onlineUsers);
    }
    socket.on("disconnect", () => {
      console.log("user disconnected");
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
