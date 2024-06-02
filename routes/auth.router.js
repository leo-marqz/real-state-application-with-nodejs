
import express from 'express';
import {signInForm, signInProcess, signUpForm, signUpProcess, verifyAccountConfirmationToken, forgotMyPassword} from '../controllers/auth.controller.js';

const router = express.Router();

// define a route 

router.get('/signin', signInForm); // use the login method from the UserController class
router.post('/signin', signInProcess); // use the login method from the UserController class

router.get('/signup', signUpForm); // use the postLogin method from the UserController class
router.post('/signup', signUpProcess); // use the postLogin method from the UserController class
router.get('/confirm/:token', verifyAccountConfirmationToken);

router.get('/forgot-my-password', forgotMyPassword); 


export default router;