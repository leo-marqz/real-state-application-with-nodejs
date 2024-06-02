import express from 'express'; //ECMA6 module syntax


import authRouter from './routes/auth.router.js';
import db from './configurations/database.js';

const app = express();
const PORT = process.env.PORT || 3000;

// habilitar lectura de datos del formulario
app.use( express.urlencoded({extended: true}) );

// Test the connection to the database
try {
    await db.authenticate();
    db.sync();

    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

//Routes
app.use("/auth", authRouter); // use the userRoutes module

// Enable Pug
app.set('view engine', 'pug'); // set the view engine to pug
app.set('views', './views'); // set the views directory

app.use(express.static('public')); // serve static files from the public directory

// run server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});