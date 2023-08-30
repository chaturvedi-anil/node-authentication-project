import { Router } from "express";
import usersRoute from './users.js';
import { homeController, signUp, signIn} from "../controllers/homeController.js";

const route = Router();

route.get('/', homeController);
route.get('/sign-up', signUp);
route.get('/sign-in', signIn);

route.use('/users', usersRoute);


export default route;