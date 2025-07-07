import express from "express";
import cors from "cors";
import { connectDB } from "./middlewares/mongodb.js";
import { envKeys } from "./config/keys.js";
import { routes } from "./routes/routes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();
const PORT = envKeys.port;

app.use(
    cors({
      origin: "http://localhost:3000", 
      methods: ["GET", "POST", "PUT", "DELETE"], 
      credentials: true, 
    })
  );
app.use(express.json());

routes(app);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`change`);
});

app.use(errorHandler);
