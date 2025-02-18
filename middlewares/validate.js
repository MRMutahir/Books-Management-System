import { validationResult } from "express-validator";

export const validate = async (req, res, next) => {
  const errors = validationResult(req);
  const error = {};
  if (!errors.isEmpty()) {
    errors.array().map((err) => (error[err.path] = err.msg));
    return res.status(422).json({ error, success: false });
  }
  next();
};




