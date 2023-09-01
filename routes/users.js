import { Router } from "express";
import passport from "passport";

const route = Router();

// Import controller functions
import {
  signUp,
  signIn,
  userProfile,
  createUser,
  createSession,
  destroySession,
} from "../controllers/userController.js";

// Route for user profile, protected by passport.checkAuthentication middleware
route.get('/profile', userProfile);

// Route for user registration (Sign-up)
route.get('/sign-up', signUp);

// Route for user login (Sign-in)
route.get('/sign-in', signIn);

// Route for user logout (Sign-out)
route.get('/sign-out', destroySession);

// Route to create a new user
route.post('/create', createUser);

// Route to create a user session (Login) using passport's local authentication strategy
route.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' }
), createSession);

export default route;
