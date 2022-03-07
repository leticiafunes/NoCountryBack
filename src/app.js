const express = require ('express');
const app = express();
const cors  = require ('cors');
const bodyParser = require('body-parser');


require('passport')


//settings - - -
app.set ('port', process.env.PORT || 4001);

//middlewares
app.use (cors()); //cors hace q dos servidores se conecten entre ellos (back y front por ej)
app.use (express.json()); //para q las rutas entiendan json y strings

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Para usr form-data con postman y poder hacer put
/*var expressBusboy = require('express-busboy');
expressBusboy.extend(app);*/


//routes

const auth = require('./routes/auth');
const users = require('./routes/users');
const news = require('./routes/news');
const advertisements = require('./routes/advertisements');


app.use('/auth', auth);
app.use ('/api/users', users); 
app.use ('/api/news', news); 
app.use ('/api/advertisements', advertisements); 

//Para ocultar la ruta donde se alamacenan laas imágenes
app.use ('/public', express.static(`${__dirname}/storage/images`)); 

module.exports = app;



