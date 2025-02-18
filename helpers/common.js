import bcrypt from "bcrypt";

export const sendResponse = async (
  res,
  message,
  success = true,
  code = 200,
  data = null
) => {
  const response = {
    message,
    success,
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(code).json(response);
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = async (password, userPassword) => {
  const isMatch = await bcrypt.compareSync(password, userPassword);
  return isMatch
};




