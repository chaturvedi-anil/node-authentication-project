import { Router } from "express";
import {userProfile ,createUser, createSession } from "../controllers/userController.js";
const route = Router();

route.post('/create', createUser);

route.get('/profile', userProfile);

route.post('/create-session', createSession);

export default route;