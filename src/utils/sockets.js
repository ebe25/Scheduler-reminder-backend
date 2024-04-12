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
          editedAt: new Date(),
        },
      });
      return user;
    }
  } catch (error) {
    console.log("Error", error);
    throw new Error("Error while creating user", error);
  }
}

// export async function getUserTodoByindex(data) {
//   console.log("--askljdfhjklashdf-----",data.user.email)
//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         email: data.user.email,
//       },
//       include:{
//         todos
//       }
//     });
//     console.log("dbusertoodsogetUserTOdo", user)
//     return {userTodo, user};
//   } catch (error) {
//     console.log("Error", error);
//     throw new Error("Error while getUserTodoByindex", error);
//   }
// }

//have to create a todos table and realate them
export async function markTodoCompleted(data) {
  try {
    const userFromDb = await getUserWithTodos(data.user);
    const todoToUpdate = userFromDb.todos[data.index]; // Get the todo to update
    console.log("---updtodo", todoToUpdate);
    const response = await prisma.todo.update({
      where: {
        id: todoToUpdate.id,
      },
      data: {
        status: "COMPLETED",
      },
    });
    return {response, userFromDb};
  } catch (error) {
    console.log("Error", error);
    throw new Error("Error while markTodoCompleted", error);
  }
}

export async function getUserWithTodos(data) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
      include: {
        todos: true,
      },
    });
    return user;
  } catch (error) {
    console.log("Error", error);
    throw new Error("Error while user", error);
  }
}
