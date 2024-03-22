import {serverUpgradedToWs} from "../server";

serverUpgradedToWs.on("connection", (socket) => {
  const users = {};

  socket.on("login", function (data) {
    console.log("a user " + data.userId + " connected");
    // saving userId to object with socket ID
    users[socket.id] = data.userId;
  });

  io.on("disconnect", (socket) => {
    console.log("client id disconnected", socket.id);
    console.log("user " + users[socket.id] + " disconnected");
    // remove saved socket from users object
    users[socket.id];
  });
});
