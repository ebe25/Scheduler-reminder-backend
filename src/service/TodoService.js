import TodoRepositary from "../repositary/todoRepo.js";


class TodoService{
    constructor(){
        this.repo= new TodoRepositary();
    }

async create (data){
    try {
        const newToDo = await this.repo.create(data);
        return newToDo;
      } catch (error) {
        console.log("error", error);
        throw {error};
      }

}
async get (userEmail){
    try {
        const newToDo = await this.repo.get(userEmail);
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
export default TodoService;
