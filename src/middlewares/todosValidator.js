export const todoValidation = (req, res, next) => {
  // || !req.body.time add this later
  const missingFields = [];
  console.log("rewwer",req.body.label)
  if (!req.body.label) {
    missingFields.push("Labels Array");
    return res.status(400).send({
      data: {},
      sucess: false,
      message: `please provide ${missingFields.join(",")} fields`,
      err: "Bad request",
    });
  }
  next();
};
