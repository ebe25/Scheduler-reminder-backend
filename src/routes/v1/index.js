import * as TodoController from "../../controllers/TodoController.js";
import * as UserController from "../../controllers/UserController.js";
import express from "express";
import {createTodo} from "../../middlewares/todosValidator.js";
const routes = express.Router();
routes.post("/todo", createTodo, TodoController.create);
routes.get("/todos", TodoController.get)



routes.post("/user", UserController.create)
routes.get("/users", UserController.getAll)
export default routes;

