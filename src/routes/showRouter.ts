import express from "express";
import { AppRoutes } from "../app";
import { ShowController } from "../controller/ShowController";

const showRouter = express.Router();

const showController = new ShowController();

showRouter.post("/schedule", showController.scheduleShow);
showRouter.get("/getAll", showController.getShows);

const showHandle: AppRoutes = {
  path: "/shows",
  handle: showRouter,
};

export default showHandle;
