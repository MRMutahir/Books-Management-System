import { sendResponse } from "../helpers/common.js";

const routes = async (app) => {

  app.get("/", (req, res) => {
    sendResponse(res, "Welcome to Node Server");
  });


  app.use("/api/v1/auth", async (req, res, next) => {
    const { authRoutes } = await import("../routes/auth.js");
    authRoutes(req, res, next);
  });


  app.use("/api/v1/books", async (req, res, next) => {
    const { booksRoutes } = await import("../routes/books.js");
    booksRoutes(req, res, next);
  });

  app.use((req, res) => {
    res.status(404).send("Route does not exist");
  });
};

export { routes };
