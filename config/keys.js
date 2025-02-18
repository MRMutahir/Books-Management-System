import 'dotenv/config'

const envKeys = {
  dbUri: String(process.env.MONGODB_URI),
  port: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
};

export { envKeys };
