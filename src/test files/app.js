const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// PROVISIONAL VARIABLES #####################################

const WORKING_PORT =  process.env.PORT || 3000;
const PROVISIONAL_LOGIN_ROUTE = '/pages/login.html';


app.use(bodyParser.urlencoded({extended:true})); // for parsing application/x-www-form-urlencoded - data

// MONGO DB SET UP ############################################

mongoose.connect('mongodb://localhost:27017/UserDB');

const UserSchema = new mongoose.Schema({
    'email': String,
    'password': String
});

const User = mongoose.model('user', UserSchema);

// SERVER FUNCTIONALITIES ####################################

// SIGN-UP FEATURE --------------------------------------

// LOG-IN FEATURE --------------------------------------- CAMBIAR RUTA PROVISORIA

app.route('/')
    .get((req,res)=>{
        res.sendFile(__dirname + PROVISIONAL_LOGIN_ROUTE);
    })
    .post((req,res)=>{
        const userEmail = req.body.email;
        const userPassword = req.body.password;

        const user = {
            'email': userEmail,
            'password': userPassword
        };

        const userExist = User.countDocuments({'email': user.email}, (err, count)=>{
            if (err){
                console.log(err);
            }else{
                if(count !== 0){

                    //CASE WHERE USER IS REGISTERED AND TRIES TO LOG IN --------------------------------------
                    User.findOne({'email' : user.email}, (err,userFound)=>{

                        const emailFound = userFound.email;

                        if(!err && emailFound === user.email){
                            const bgStyle = '\x1b[47m'; // white
                            const fgStyle = '\x1b[30m'; // black
                            const messageStyle = bgStyle + fgStyle + '%s\x1b[0m' 
                        
                            console.log(messageStyle, `USER EMAIL: ${userEmail} -- USER PASSWORD: ${userPassword}`);
                            res.send(`USER EMAIL: ${userEmail} -- USER PASSWORD: ${userPassword} successfully added to db`);    
                        }else{
                            console.log(err);
                        }
                    });
                
                }else{
                    //CASE WHERE USER IS TRYING TO ACCESS THE LOG IN ROUTE WITHOUT BEING REGISTERED---------
                    console.log('User not registered. Please Sign In!');
                    // res.send('User not registered. Please Sign In!');
                    res.redirect('/');
                }
            }
        });
    });

// APP RUNNING ############################################

app.listen(WORKING_PORT, ()=>{

    const bgStyle = '\x1b[43m'; // yellow
    const fgStyle = '\x1b[30m'; // black
    const messageStyle = bgStyle + fgStyle + '%s\x1b[0m' 

    if(WORKING_PORT === 3000){
        console.log(messageStyle , `-- Server running on Port ${WORKING_PORT} --`);
    }else{
        console.log(messageStyle, '-- WEB APP SERVER RUNNING --');
    }
});
