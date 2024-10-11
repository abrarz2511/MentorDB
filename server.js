require('dotenv').config
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
//const corsOptions = require('./configurations/corsOptions')
const PORT = 3500;   //process.env.PORT || 3500
const mongoose = require('mongoose');
const connectDB = require('./configurations/dbConn');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorhandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');

//Connect to MongoDB
connectDB();

//custom middleware: logger
app.use(logger);

//custom middleware: credentials (CORS)
app.use(credentials); 

//third party middleware: Cross Origin Resource Sharing
app.use(cors());

//built in middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//middleware for debugging
app.use((req, res, next) => {
    console.log('Request Method:', req.method);
    console.log('Request URL:', req.url);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    next();
});


//middleware for cookies
app.use(cookieParser());

//serving static files
app.use('/',express.static('public'));  //After applying this middleware, express will be able to serve static files that are reffered to in the following functions(such as img, css, text etc

//route handlers
app.use('/', require('./Routes/root'));
app.use('/register', require('./Routes/register'));
app.use('/auth', require('./Routes/auth')); 
app.use('/refresh', require('./Routes/refresh') );
app.use('/logout', require('./Routes/logout'));
app.use(verifyJWT); 
app.use('/employees', require('./Routes/employees'))       //importing routes as a module using a middleware

app.all('/*', (req, res)=> {
    res.status(404)
    if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));     //Custom 404 page, not the default express one, also sends 404 status instead of 200
    }
    else if (req.accepts('json')) {
        res.json({error: '404 Not Found'});
    }
    else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);   // error handling middleware

mongoose.connection.once('open', () => {                                                 //only listen if connected to mongodb once
    console.log('Connected to MongoDB');
    try{
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
    catch(err){
        console.log(err);
    }
}).on('error', err => {
    console.error('Error connecting to MongoDB', err);
});






/*
const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res, next) => {
    console.log('three');
    res.send('Hello from three');
}
app.get('/test', [one, two, three]);
*/