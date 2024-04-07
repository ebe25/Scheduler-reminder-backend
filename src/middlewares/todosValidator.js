export const todoValidation = (req, res, next) => {
  // || !req.body.time add this later
  const missingFields = [];
  console.log("todovalidator middleqware",req.body.todos)
  if (!req.body.todos) {
    missingFields.push("Todos Array");
    return res.status(400).send({
      data: {},
      sucess: false,
      message: `please provide ${missingFields.join(",")} fields`,
      err: "Bad request",
    });
  }
  next();
};
