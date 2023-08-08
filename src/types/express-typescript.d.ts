import { Router } from "express";

declare interface AppRouter {
  router: Router;
  prefix: string;
}
