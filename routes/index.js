import { Router } from "express";
import { homeController } from "../controllers/homeController.js";

const route = Router();

route.get('/', homeController);

export default route;