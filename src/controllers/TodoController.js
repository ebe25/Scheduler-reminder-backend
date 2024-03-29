import TodoService from "../service/TodoService.js";
const todoService = new TodoService();
export const create = async (req, res) => {
  try {
    const response = await todoService.create(req.body);
    return res.status(200).send({
      data: response,
      message: "To-Do created Succesfully",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).send({
      data: {},
      message: "request failed",
      success: false,
      err: "Failed to create To-do",
    });
  }
};
export const get = async (req, res) => {
  try {
    const response = await todoService.get(id);
    return res.status(200).send({
      data: response,
      message: "user tasks fetched Succesfully",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).send({
      data: {},
      message: "request failed",
      success: false,
      err: "Failed to fetch tasks",
    });
  }
};
export const getAll = async (req, res) => {
  try {
    const response = await todoService.getAll();
    return res.status(200).send({
      data: response,
      message: "user tasks fetched Succesfully",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).send({
      data: {},
      message: "request failed",
      success: false,
      err: "Failed to fetch tasks",
    });
  }
};
