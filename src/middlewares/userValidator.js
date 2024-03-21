export const userValidation = (req, res,next) => {
    if (!req.body.email) {
      return res.status(400).send({
        data: {},
        sucess: false,
        message: "please provide required fields",
        err: "Bad request",
      });
    }
    next();
  };
  
  
  