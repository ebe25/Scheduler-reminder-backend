import prisma from "../config/serverConfig.js";

export async function getOnlineUsers() {
  try {
    const response = await prisma.user.findMany({
      where: {
        isOnline: true,
      },
    });
    return response;
  } catch (error) {
    console.log("Error ", error);
    throw new Error("Error while getting all the online users", error);
  }
}

export async function toggleUserOnlineStatus(userEmail, onlineStatus) {
  try {
    const user = await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        isOnline: onlineStatus,
      },
    });
    return user;
  } catch (error) {
    console.log("Error ", error);
    throw new Error("Error while toggling user status", error);
  }
}

export async function findBySocketId(socketid) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        socketId: socketid,
      },
    });
    return user;
  } catch (error) {
    console.log("Error ", error);
    throw new Error("Error while findingby socketId", error);
  }
}
export async function createIfuserNotExists(data) {
  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!userExists) {
      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          picture: data.picture,
          socketId: data.socketId,
        },
      });
      return user;
    }
  } catch (error) {
    console.log("Error", error);
    throw new Error("Error while creating user", error);
  }
}

export async function getUserTodoByindex(data) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.user.email,
      },
    });
    const userTodo = user.todos[data.todoIdx];
    return {userTodo, user};
  } catch (error) {
    console.log("Error", error);
    throw new Error("Error while getUserTodoByindex", error);
  }
}
