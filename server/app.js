const express = require ('express');
const app = express();
const cors  = require ('cors');



//settings - - -
app.set ('port', process.env.PORT || 4001);

//middlewares
app.use (cors()); //cors hace q dos servidores se conecten entre ellos (back y front por ej)
app.use (express.json()); //para q las rutas entiendan json y strings


//routes

app.use ('/api/users', require ('./routes/users')); 


module.exports = app;

