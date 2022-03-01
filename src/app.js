const express = require ('express');
const app = express();
const cors  = require ('cors');



require('passport')


//settings - - -
app.set ('port', process.env.PORT || 4001);

//middlewares
app.use (cors()); //cors hace q dos servidores se conecten entre ellos (back y front por ej)
app.use (express.json()); //para q las rutas entiendan json y strings

app.use(express.urlencoded({extended: true})); //Para que reconozca los body.req de un post

//routes

const auth = require('./routes/auth');
const users = require('./routes/users');

app.use('/auth', auth);
app.use ('/api/users', users); 

module.exports = app;



