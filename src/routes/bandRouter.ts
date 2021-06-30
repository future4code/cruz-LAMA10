import express from "express";
import { AppRoutes } from "../app";
import BandController from "../controller/BandController";

const bandRouter = express.Router();

const bandController = new BandController();

bandRouter.post("/register", bandController.registerBand);
bandRouter.get("/", bandController.getBand);

const bandHandle: AppRoutes = {
  path: "/bands",
  handle: bandRouter,
};

export default bandHandle;
