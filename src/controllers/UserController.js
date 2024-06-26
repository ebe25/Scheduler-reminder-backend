import UserService from "../service/UserService.js";
const userService = new UserService();
export const create = async (req, res) => {
  try {
    const response = await userService.create(req.body);
    return res.status(201).send({
      data: response,
      message: "User created Succesfully",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).send({
      data: {},
      message: "request failed",
      success: false,
      err: "Failed to create user",
    });
  }
};
export const get = async (req, res) => {
  try {
    const response = await userService.get(req.body.userEmail);
    return res.status(200).send({
      data: response,
      message: "user  fetched Succesfully",
      success: true,
      err: {},
    });
  } catch (error) {
    return res.status(500).send({
      data: {},
      message: "request failed",
      success: false,
      err: "Failed to fetch ",
    });
  }
};
export const getAll = async (req, res) => {
  try {
    const response = await userService.getAll();
    return res.status(200).send({
      data: response,
      message: "users  fetched Succesfully",
      success: true,
      err: {},
      status: 200,
    });
  } catch (error) {
    return res.status(500).send({
      data: {},
      message: "request failed",
      success: false,
      err: "Failed to fetch ",
      status: 500,
    });
  }
};
