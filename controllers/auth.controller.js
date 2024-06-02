import {check, validationResult} from 'express-validator'
import { sendEmailToConfirmaAccount } from '../helpers/emails.js'

import User from '../models/User.js'
import { generateId } from '../helpers/tokens.js';

//Sign In
//==================================================
const signInForm = (req, res) =>{
    res.render('auth/signin', {
        page: 'Iniciar Sesión'
    });
}

const signInProcess = (req, res) =>{
    res.send('Usuario logueado');
}

//Sign Up
//==================================================
const signUpForm = (req, res) =>{
    res.render('auth/signup', {
        page: 'Crear Cuenta'
    });
}

const signUpProcess = async (req, res) =>{

    const {name, email, password } = req.body;
    
    //validation
    await check('name', 'El nombre no puede ir vacio').run(req);
    await check('email', 'El email es invalido').isEmail().run(req);
    await check('password', 'La contraseña debe ser de al menos 8 caracteres').isLength({ min:8 }).run(req);
    await check('repeat_password', 'Las contraseñas no son iguales').contains(password).run(req);

    let result = validationResult(req);

    if( !result.isEmpty() ){
        return res.render('auth/signup',{ 
            page: 'Crear Cuenta',
            errors: result.array(),
            user: { name, email }
        });
    }

    const userExists = await  User.findOne({ where: { email } });

    if( userExists )
    {
        return res.render('auth/signup',{ 
            page: 'Crear Cuenta',
            errors: [{msg: 'El usuario ya ha sido registrado'}],
            user: { name, email }
        });
    }

    const usr = await User.create({ name, email, password, token: generateId() });

    //send mail confirmation
    await sendEmailToConfirmaAccount({
        name: usr.name,
        email: usr.email,
        token: usr.token
    });

    // Mostrar mensaje de confirmacion
    res.render('templates/message', {
        page: 'Cuenta Añadida',
        message: 'Hemos enviado un email de confirmacion'
    })

}

const verifyAccountConfirmationToken = (req, res, next) => {

    const { token } = req.params;

    //verify token

    //confirm account
    

    console.log(token + "   comprobando...");

    next();
}

//Others
//====================================================
const forgotMyPassword = (req, res) =>{
    res.render('auth/forgot-my-password', {
        page: 'Recuperar Contraseña'
    });
}


export {
    signInForm,
    signInProcess,
    signUpForm,
    signUpProcess,
    verifyAccountConfirmationToken,
    forgotMyPassword
}