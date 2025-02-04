import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5137" }));

// application routes
app.use("/api/v1", router);

const getController = async (req: Request, res: Response) => {
  res.send("hello");
};

// test route
app.get("/", getController);

// error handlers
app.use(globalErrorHandler);
app.use(notFound);

export default app;
