import express from "express";
import { AppRoutes } from "../app";
import BandController from "../controller/BandController";

const bandRouter = express.Router();

const bandController = new BandController();

bandRouter.post("/signup", bandController.registerBand);
bandRouter.post("/login", bandController.bandById);

const bandHandle: AppRoutes = {
  path: "/users",
  handle: bandRouter,
};

export default bandHandle;
