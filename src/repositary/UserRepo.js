import CrudRepositary from "./CrudRepo.js";
import prisma from "../config/serverConfig.js";

class UserRepositary extends CrudRepositary {
  constructor() {
    super(prisma.user);
  }

  // async getAllTodos(userEmail) {
  //   try {
  //     const response = await prisma.user.findUnique({
  //       where: {
  //         email: userEmail,
  //       },

  //     });
  //   } catch (error) {
  //     console.log("Error while getting all the users todos", error);
  //     throw new Error("Error while getting all the users todos");
  //   }
  // }
}
export default UserRepositary;
