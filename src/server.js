import express, {urlencoded} from "express";
import dotenv from "dotenv";
import ApiRoutes from "./routes/index.js";
import {PORT} from "./config/serverConfig.js";
import { createServer } from "http";


dotenv.config();
async function setupAndStartServer() {
  const app = express();
  // const server = createServer(app);


  // const io = new Server(server);
  // io.on("connection", (socket) => {
  //   console.log("ws server running, new connection established");
  // io.emit("msg",{abc:"can send objects as well"});
  // });




  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use("/api", ApiRoutes);
  // app.use(express.static(path.resolve('src/public')))
  // app.get("/", (req,res)=>res.sendFile("/public/index.html"))


  app.listen(PORT, () => {
    console.log("Listening on port", PORT);
  });
}
setupAndStartServer();




