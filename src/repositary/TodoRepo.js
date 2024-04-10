import prisma from "../config/serverConfig.js";

class TodoRepositary {
  async create(user) {
    try {
      const response = await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          todos: user.todos,
        },
      });
      return response;
    } catch (error) {
      console.log("error while creating todo", error);
      throw {error};
    }
  }


}
export default TodoRepositary;
