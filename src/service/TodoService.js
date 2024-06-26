import TodoRepositary from "../repositary/TodoRepo.js";

class TodoService {
  constructor() {
    this.repo = new TodoRepositary();
  }

  async create(data) {
    try {
      const transFormedtodos = data.todos.map((todo) => ({
        title: todo,
      }));
      const newToDo = await this.repo.create({
        ...data,
        todos: transFormedtodos,
      });
      return newToDo;
    } catch (error) {
      console.log("error", error);
      throw {error};
    }
  }
  async get(userEmail) {
    try {
      const newToDo = await this.repo.get(userEmail);
      return newToDo;
    } catch (error) {
      console.log("error", error);
      throw {error};
    }
  }
  async getAll() {
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
