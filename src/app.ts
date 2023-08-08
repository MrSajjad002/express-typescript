import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import logger from "morgan";
import path from "path";
import { configDotenv } from "dotenv";
import { connect } from "mongoose";
import cors from "cors";
import { AppRouter } from "./types/express-typescript";
import indexRouter from "./routes/index.router";

// create application
const app: Application = express();

// configuration
configDotenv();

// middleware
app.use(logger("dev"));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));

// connected to the database
const databaseConnect = async () => {
  connect(process.env.MONGODB_CONNECTION_STRING || "your-connection")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch(() => {
      console.log("can`t connect to MongoDB");
    });
};
databaseConnect();

// endpoints
const setRouters = async (routers: AppRouter[]) => {
  for (const route of routers) {
    await app.use(route.prefix, route.router);
  }
};
const routers: AppRouter[] = [{ router: indexRouter, prefix: "/" }];
setRouters(routers);

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found");
  next(error);
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.send("error");
});

export default app;
