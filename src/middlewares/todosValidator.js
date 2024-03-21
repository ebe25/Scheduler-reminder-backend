export const todoValidation = (req, res,next) => {
  if (!req.body.label || !req.body.time) {
    return res.status(400).send({
      data: {},
      sucess: false,
      message: "please provide required fields",
      err: "Bad request",
    });
  }
  next();
};


