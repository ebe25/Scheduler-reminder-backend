import * as TodoController from "../../controllers/TodoController.js";
import * as UserController from "../../controllers/UserController.js";
import express from "express";
import {todoValidation} from "../../middlewares/todosValidator.js";
import {userGetValidation, userPostValidation} from "../../middlewares/userValidator.js";
const routes = express.Router();
routes.post("/todos", todoValidation, TodoController.create);
routes.get("/todos", TodoController.getAll);

routes.post("/users", userPostValidation, UserController.create);
routes.get("/users", UserController.getAll);
// routes.get("/users", userGetValidation, UserController.get);
export default routes;
