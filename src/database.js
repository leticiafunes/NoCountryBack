const mongoose = require ('mongoose');
const URI = process.env.MONGODB_URI; //crea la base de datos si no está creada
mongoose.connect (URI, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once ('open', ()=> {console.log ('Database Connected');})