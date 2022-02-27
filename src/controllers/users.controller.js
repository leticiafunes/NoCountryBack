const usersCtrl = {};
const { TokenExpiredError } = require("jsonwebtoken");
const User = require("../models/User");
const token = require("../services/Token");


//User Sign Up 

usersCtrl.createUser = async (req, res) => {
  let messages = [];

  const { username, email, name, lastname, password, confirm_password } = req.body;

  if (password != confirm_password) {
    messages.push({ type: "error", text: "Las claves no coinciden" });
  }

  if (password.length < 4) {
    messages.push({
      type: "error",
      text: "La clave tiene que tener al menos 4 caracteres",
    });
  }
  if (messages.length > 0) {
    
    const user_errors = {
      messages: messages,
      username: username,
      email: email,
      name: name,
      lastname: surname,
      password: password,
      confirm_password: confirm_password,
    };

    res.json(user_errors);
  } else {
    // Existe el usuario?

    const userName = await User.findOne({ email: email });

    if (userName) {
      messages.push({ type: "error", text: "Duplicated user" });
      res.json(messages);
    } else {
      // Save New User
      const role = "reader";
      const newUser = new User({ username, email, name, lastname, password, role });
      newUser.password = await newUser.encryptPassword(password);
      
      
       await newUser.save ((err)  => {

        if (err) return res.status (500).send({message: `Error creating user: ${err}`})
       
        messages.push({ type: "ok", text: "User registered." });

        return res.status (201).send ({messages: messages, token: token.createToken (newUser)})

      })
      
      
      
     
    }
  }
};


usersCtrl.login = async (req, res) => {
 
 
 
  const user = await User.find({email: req.body.email}, (err, user) => {
   if (err) res.sttus (500).send({message: `Error : : ${err}`})
   if (!user) res.status (404).send({message: `User not found`})

   req.user = user
   res.status (200).send ({message: 'You are accepted'}) 

  });


  res.json(user);


};


usersCtrl.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};



usersCtrl.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: ["Usuario Borrado. Id: " + req.params.id] });
};

usersCtrl.getUser = async (req, res) => {
  const user = await findById(req.params.id);
  res.json(user);
};

usersCtrl.getUserByUsername = async (req, res) => {
  const filter = { username: req.params.id };
  const user = await find(filter);
  res.json(user);
};

usersCtrl.updateUser = async (req, res) => {
  let messages = [];
  const filter = { _id: req.params.id };

  const { username, email, name, lastname, password, confirm_password, role } = req.body;

  if (password != confirm_password) {
    messages.push({ type: "error", text: "Las claves no coinciden" });
  }

  if (password.length < 4) {
    messages.push({
      type: "error",
      text: "La clave tiene que tener al menos 4 caracteres",
    });
  }
  if (messages.length > 0) {
    
    const user_errors = {
      messages: messages,
      username: username,
      email: email,
      name: name,
      lastname: surname,
      password: password,
      confirm_password: confirm_password,
    };

    res.json(user_errors);
  } else {
     
    // Edit User
      const newUser = new User({ username, email, name, lastname, password, role });

  
      const newpassword = await newUser.encryptPassword(password);

   

      const result = User.findOneAndUpdate (filter, {username, email, name, lastname, newpassword, role}, 
        (err, {username, email, name, lastname, password, role}) => {
        if (err) return res.status (500).send({message: `Error creating user: ${err}`})
        messages.push({ type: "ok", text: "User updated." });
        res.json(messages);
      });
    
    
  
      
      

  }
  
};











module.exports = usersCtrl;

