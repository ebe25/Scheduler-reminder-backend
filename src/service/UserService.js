import UserRepositary from "../repositary/UserRepo.js";


class UserService{
    constructor(){
        this.repo= new UserRepositary();
    }

async create (data){
    try {
        const newUser = await this.repo.create(data);
        return newUser;
      } catch (error) {
        console.log("error", error);
        throw {error};
      }

}
async get (userEmail){
    try {
        const newToDo = await this.repo.create(userEmail);
        return newToDo;
      } catch (error) {
        console.log("error", error);
        throw {error};
      }

}
async getAll (){
    try {
        const newToDo = await this.repo.getAll();
        return newToDo;
      } catch (error) {
        console.log("error", error);
        throw {error};
      }

}
}
export default UserService;
