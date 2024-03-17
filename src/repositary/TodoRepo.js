import CrudRepositary from "./CrudRepo.js";
import prisma from "../config/serverConfig.js";

class TodoRepositary extends CrudRepositary {
  constructor() {
    super(prisma.todo);
  }
}
export default TodoRepositary;
