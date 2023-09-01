import { Router } from "express";
import { createUser } from "../controllers/userController.js";
const route = Router();

route.post('/create', createUser);

export default route;