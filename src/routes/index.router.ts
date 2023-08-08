import { Router } from "express";
import { home } from "../controllers/index.controller";

const indexRouter = Router();

indexRouter.get("", home);

export default indexRouter;
