const usersCtrl = {};
const User = require("../models/User");
const passport = require('passport')
const jwt = require('jsonwebtoken')
const auth = require ('../middlewares/auth')


//User Sign Up

usersCtrl.createUser = async (req, res) => {
  let messages = [];

  const { username, email, name, lastname, password, confirm_password } =
    req.body;

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
      lastname: lastname,
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
      const newUser = new User({
        username,
        email,
        name,
        lastname,
        password,
        role,
      });
      //newUser.password = await newUser.encryptPassword(password);

      await newUser.save((err) => {
        if (err)
          return res
            .status(500)
            .send({ message: `Error creating user: ${err}` });

        messages.push({ type: "ok", text: "User registered." });
        return res.json({ messages})
        
      });
    }
  }
};

usersCtrl.login = async (req, res, next) => {

  
  const { email, pass } = req.body;

  console.log ("email: " +email);
  console.log ("pass: " + pass);
  console.log ( "req:" + req);


  passport.authenticate('login', async (err, user, info) => {
    try {
      
  

      if (err || !user) {
        console.log(user)
        const error = new Error('new Error')
        console.log (err);
        return next(error)
      }
      else {
        console.log ("Usuario Existe");
      }

      //Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session.
      req.login(user, { session: false }, async (err) => {
        if (err) return next(err)
        const body = { _id: user._id, email: user.email }
        const token = jwt.sign({ user: body }, 'top_secret')
        return res.json({ "user_token:" : token })
      })
    }
    catch(e) {
      return next(e)
    }
  })(req, res, next)
}



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

  const { username, email, name, lastname, password, confirm_password, role } =
    req.body;

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
      lastname: lastname,
      password: password,
      confirm_password: confirm_password,
    };

    res.json(user_errors);
  } else {
    // Edit User
    const newUser = new User({
      username,
      email,
      name,
      lastname,
      password,
      role,
    });

    const newpassword = await newUser.encryptPassword(password);

    const result = User.findOneAndUpdate(
      filter,
      { username, email, name, lastname, newpassword, role },
      (err, { username, email, name, lastname, password, role }) => {
        if (err)
          return res
            .status(500)
            .send({ message: `Error creating user: ${err}` });
        messages.push({ type: "ok", text: "User updated." });
        res.json(messages);
      }
    );
  }
};

module.exports = usersCtrl;
