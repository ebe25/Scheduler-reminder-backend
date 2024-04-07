export const userPostValidation = (req, res, next) => {
  if (!req.body.email || !req.body.name) {
    return res.status(400).send({
      data: {},
      sucess: false,
      message: "please provide required fields",
      err: "Bad request",
    });
  }
  next();
};

export const userGetValidation = (req, res, next) => {
  const missingFields = [];
  if (!req.body.userEmail) {
    missingFields.push("userEmail");
    return res.status(400).send({
      data: {},
      sucess: false,
      message: `${missingFields.join(",")} is not provided`,
      err: "Bad request",
    });
  }
  next();
};
