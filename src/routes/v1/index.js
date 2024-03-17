import {create} from "../../controllers/TodoController.js";
import express from "express";
import {createTodo} from "../../middlewares/todosValidator.js";
const routes = express.Router();
routes.post("/todo", createTodo, create);
export default routes;
