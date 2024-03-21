import CrudRepositary from "./CrudRepo.js";
import prisma from "../config/serverConfig.js";

class UserRepositary extends CrudRepositary {
  constructor() {
    super(prisma.user);
  }
}
export default UserRepositary;
