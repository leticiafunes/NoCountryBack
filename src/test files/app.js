const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = express();

// NOTA: SE NECESITA EL MODULO PASSPORT Y PASSPORT-LOCAL PARA EL MANEJO DE LA SESION DURANTE EL MANEJO DE LA MISMA
// APARTE TAMBIEN SE NECESITA EL PASSPORT{PAGINA} PARA EL LOG IN O SIGN UP CON UNA CUENTA COMO GOOGLE, FACEBOOK, ETC

// PROVISIONAL VARIABLES #####################################

const WORKING_PORT =  process.env.PORT || 3000;
const LOGIN_ROUTE = '/pages/login.html';
const SIGNUP_ROUTE = '/pages/signup.html';
const HOME_ROUTE = '/pages/home.html';

app.use(express.urlencoded({extended:true}));
app.use(express.json());


// MONGO DB SET UP ############################################

mongoose.connect('mongodb://localhost:27017/UserDB');

// USERS SCHEMA -------------------------------------- 

const UserSchema = new mongoose.Schema({
    'email': String,
    'password': String
});

const User = mongoose.model('user', UserSchema);

// POST SCHEMA -------------------------------------- 

const PostSchema = new mongoose.Schema({
    'title': String,
    'date': Date,
    'isPublicity': Boolean,
    'message': String,
    'components': Array
});

const NewPost = mongoose.model('post', PostSchema);

// SERVER FUNCTIONALITIES ####################################

// HOME FEATURE -----------------------------------------

app.route('/')
    .get((req,res)=>{
        res.sendFile(__dirname + HOME_ROUTE);
    });

// SIGN-UP FEATURE -------------------------------------- 

app.route('/signup')
    .get((req,res)=>{
        res.sendFile(__dirname + SIGNUP_ROUTE);
    })
    .post(async (req,res)=>{ // MANDATORY ASYNC-FUNC FOR CORRECT RUNNING OF HASHED-PASSWORD VALIDATION 
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        const passwordConfirmation = req.body.pwConfirmation;

        if (userPassword === passwordConfirmation){ // PASSOWRD CONFIRMATION BLOCK<----------------------------------------
            
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = await bcrypt.hash(userPassword, salt); // SIGN-UP PW ENCRYPTION

            const user = {
                'email': userEmail,
                'date': Date,
                'password': hashedPassword
            }
            
            const userExist = User.countDocuments({'email': user.email}, (err, count)=>{// VERIFYING USER'S NOT EXISTANCE IN DB

                // const bgStyle = '\x1b[47m'; // white
                // const fgStyle = '\x1b[30m'; // black
                // const messageStyle = bgStyle + fgStyle + '%s\x1b[0m' 
                // console.log(messageStyle, user); // PROVISIONAL CODE ++++++++++++++++++++++++++++++++++++++++++++++++++++++

                if (err){
                    console.log(err);
                }else{
                    if (count === 0){
                        User.insertMany([user]); // CASE WHERE THE USER DOESN'T EXIST IN DB
                        res.send('User Successfully created!');

                        // const bgStyle = '\x1b[47m'; // white
                        // const fgStyle = '\x1b[30m'; // black
                        // const messageStyle = bgStyle + fgStyle + '%s\x1b[0m' 
                        // console.log(messageStyle,'User Successfully created'); // PROVISIONAL CODE +++++++++++++++++++++++++++++++++
                        
                    }else{
                        // const bgStyle = '\x1b[47m'; // white
                        // const fgStyle = '\x1b[30m'; // black
                        // const messageStyle = bgStyle + fgStyle + '%s\x1b[0m'  // PROVISIONAL CODE ++++++++++++++++++++++++++
                        // console.log(messageStyle, user.email + ' already exists!'); 
                        res.send(user.email + ' already exists!'); // CASE WHERE THE USER ALREADY EXIST
                    }
                }
            });
        }else{ // PASSWORD NOT CONFIRMED BLOCK <----------------------------------------------------------
            // const bgStyle = '\x1b[47m'; // white
            // const fgStyle = '\x1b[30m'; // black
            // const messageStyle = bgStyle + fgStyle + '%s\x1b[0m'  // PROVISIONAL CODE ++++++++++++++++++++++++++
            // console.log(messageStyle,'Please confirm your password correctly!');
            res.send('Please confirm your password correctly!');
        }
    });



// LOG-IN FEATURE --------------------------------------- 

app.route('/login')
    .get((req,res)=>{
        res.sendFile(__dirname + LOGIN_ROUTE);
    })
    .post((req,res)=>{
        const userEmail = req.body.email;
        const userPassword = req.body.password;


        const user = {
            'email': userEmail,
            'password': userPassword
        };

        const userExist = User.countDocuments({'email': user.email}, (err, count)=>{ // VERIFYING USER'S EXISTANCE
            if (err){
                console.log(err);
            }else{
                if(count !== 0){

                    //CASE WHERE USER IS REGISTERED AND TRIES TO LOG IN --------------------------------------
                    User.findOne({'email' : user.email}, async (err,userFound)=>{

                        const typedPassword = user.password;
                        const dbPassword = userFound.password;
                        

                        bcrypt.compare(typedPassword, dbPassword, (err, response)=>{
                            if(err){
                                console.log(err);
                            }else{
                                if (response === true) {

                                    res.send(`LOG-IN SUCCESSFUL: USER EMAIL: ${userEmail} -- USER PASSWORD: ${userPassword}`);  
                                }else{

                                    res.send(`WRONG PASSWORD FOR: ${userEmail}`);  
                                }
                            }
                        });
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

// COMPONENT'S STORAGE --------------------------------------- 

    app.route('/admin')
        .get((req,res)=>{
            res.sendFile('/pages/admin.html');
        })
        .post((req,res)=>{
            const msgContent = req.body.message;
            const publicityContent = req.body.isPublicity;
            const titleContent = req.body.title;
            const imgContent = req.body.image;
            const videoContent = req.body.video;
            const gifContent = req.body.gif;

            const today = new Date();
            const currentDate = today.getDate() + '-' + today.getMonth() + '-' + today.getFullYear();

            const arrayContent = [imgContent, videoContent, gifContent];

            const newPost = {
                'title': titleContent,
                'date': currentDate,
                'isPublicity': publicityContent,
                'message': msgContent,
                'components': arrayContent
            }

            NewPost.insertMany([newPost], (err, posts) =>{
                if(err){
                    console.log(err);
                }else{
                    res.send('Post successfully added!');
                }
            })
        })
        .delete((req,res) =>{

            const title = req.body.title;
            NewPost.deleteOne({'title': title}, (err)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log('Deletion successful!');
                }
            });
        })
        .put((req,res)=>{
            const msgContent = req.body.message;
            const publicityContent = req.body.isPublicity;
            const titleContent = req.body.title;
            const imgContent = req.body.image;
            const videoContent = req.body.video;
            const gifContent = req.body.gif;

            const today = new Date();
            const currentDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

            const arrayContent = [imgContent, videoContent, gifContent];

            const newPost = {
                'title': titleContent,
                'date': currentDate,
                'isPublicity': publicityContent,
                'message': msgContent,
                'components': arrayContent
            }

            NewPost.updateOne({'title': titleContent}, {newPost}, (err)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log('Update successful!');
                }
            });
        });

// APP RUNNING ############################################

app.listen(WORKING_PORT, ()=>{

    const bgStyle = '\x1b[43m'; // yellow
    const fgStyle = '\x1b[30m'; // black
    const messageStyle = bgStyle + fgStyle + '%s\x1b[0m' // PROVISIONAL CODE ++++++++++++++++++++++++++++++++++++++++++++++++++++++

    if(WORKING_PORT === 3000){
        console.log(messageStyle , `-- Server running on Port ${WORKING_PORT} --`);
    }else{
        console.log(messageStyle, '-- WEB APP SERVER RUNNING --');
    }
});
