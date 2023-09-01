import { Router } from "express";
import usersRoute from './users.js';
import { homeController} from "../controllers/homeController.js";

const route = Router();

route.get('/', homeController);

route.use('/users', usersRoute);


export default route;