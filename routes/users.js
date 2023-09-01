import { Router } from "express";
import {signUp, signIn, userProfile ,createUser, createSession } from "../controllers/userController.js";
import passport from "passport";
const route = Router();

route.get('/sign-up', signUp);
route.get('/sign-in', signIn);
route.get('/profile', userProfile);

route.post('/create',createUser);

route.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), createSession);

export default route;