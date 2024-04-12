import prisma from "../config/serverConfig.js";

class TodoRepositary {
  async create(user) {
    try {
      const userFromDb = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });
      const transformTodosMore = user.todos.map((todo) => ({
        ...todo,
        userId: userFromDb.id,
      }));
      const response = await prisma.todo.createMany({
        data: transformTodosMore,
      });
      return response;
    } catch (error) {
      console.log("error while creating todo", error);
      throw {error};
    }
  }
  async getAll() {
    try {
      const todos = await prisma.todo.findMany();
      return todos;
    } catch (error) {
      console.log("error while getting all the todos", error);
      throw {error};
    }
  }

  // async getById(user) {
  //   try {
  //     const response = await prisma.user.findUnique({
  //       where: {
  //         email: user.email,
  //       },
  //       data: {
  //         todos: user.todos,
  //       },
  //     });
  //     return response;
  //   } catch (error) {
  //     console.log("error while creating todo", error);
  //     throw {error};
  //   }
  // }
  // async getById(user) {
  //   try {
  //     const response = await prisma.user.findUnique({
  //       where: {
  //         email: user.email,
  //       },
  //       data: {
  //         todos: user.todos,
  //       },
  //     });
  //     return response;
  //   } catch (error) {
  //     console.log("error while creating todo", error);
  //     throw {error};
  //   }
  // }
}
export default TodoRepositary;
