import express, {urlencoded} from "express";
import dotenv from "dotenv";
import {PORT} from "./config/serverConfig.js";
import {createServer} from "http";
import {Server} from "socket.io";
import cors from "cors";
import ApiRoutes from "./routes/index.js";
import {
  createIfuserNotExists,
  findBySocketId,
  getOnlineUsers,
  markTodoCompleted,
  toggleUserOnlineStatus,
} from "./utils/sockets.js";
dotenv.config();

async function setupAndStartServer() {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", async (socket) => {
    console.log("user connected with ", socket.id);
    const users = await getOnlineUsers();
    io.emit("active_users", users);
    socket.on("connection_made", async (user) => {
      console.log("------conection made event-----");
      try {
        console.log("connection-made", user);
        if (user !== null) {
          setTimeout(async () => {
            await toggleUserOnlineStatus(user.email, true);
            const users = await getOnlineUsers();
            io.emit("active_users", users);
          }, 1000);
        }
       
      } catch (error) {
        console.log(
          "Erorr while toggling user status connection-made event",
          error
        );
        throw new Error(
          "Erorr while toggling user status connection-made event"
        );
      }
    });
    socket.on("login_completed", async (user) => {
      console.log("---here");
      try {
        const userData = {...user};
        const newUser = await createIfuserNotExists(userData);
        if (newUser) {
          await toggleUserOnlineStatus(newUser.email, true);
        } else {
          await toggleUserOnlineStatus(user.email, true);
        }
        const users = await getOnlineUsers();
        socket.broadcast.emit("active_users", users);
       
      } catch (error) {
        console.log("ERror while login_completed status update", error);
      }
    });

    socket.on("logout_triggered", async (user) => {
      try {
        await toggleUserOnlineStatus(user.email, false);
        const users = await getOnlineUsers();
        io.emit("active_users", users);
      } catch (error) {
        console.log("Error while logout_triggere status update", error);
      }
    });

    socket.on("task_completed", async (data) => {
      console.log("task_completed data", data);

      // //update the usertodo to be completed
      const {response, userFromDb} = await markTodoCompleted(data);
      io.emit("notify", {label: response.title, username: userFromDb.name});
    });

    socket.on("custom_dc", async (user) => {
      console.log("user dced custom reload case")
      if (user !== null) {
        setTimeout(async () => {
          await toggleUserOnlineStatus(user.email, false);
          const users = await getOnlineUsers();
          io.emit("active_users", users);
        }, 1000);
      }
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
