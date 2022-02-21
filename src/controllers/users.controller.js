const usersCtrl = {};
const User = require("../models/User");

import User, {
  findOne,
  find,
  findByIdAndDelete,
  findById,
  findOneAndUpdate,
} from "../models/User";

//User Sign Up 

usersCtrl.createUser = async (req, res) => {
  let messages = [];

  const { username, nombre, apellido, password, confirm_password } = req.body;

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
      nombre: nombre,
      apellido: apellido,
      password: password,
      confirm_password: confirm_password,
    };

    res.json(user_errors);
  } else {
    // Existe el usuario?

    const userName = await findOne({ username: username });

    if (userName) {
      messages.push({ type: "error", text: "El usuario ya existe." });
      res.json(messages);
    } else {
      // Save New User
      const rol = "Lector";
      const newUser = new User({ username, nombre, apellido, password, rol });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      messages.push({ type: "error", text: "Usuario registrado." });
    }
  }
};


usersCtrl.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};



usersCtrl.deleteUser = async (req, res) => {
  await findByIdAndDelete(req.params.id);
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
  const { username, nombre, apellido, password, rol } = req.body;
  const filter = { _id: req.params.id };
  const user = await findOneAndUpdate(filter, {
    username: username,
    nombre: nombre,
    apellido: apellido,
    password: password,
    confirm_password: confirm_password,
    rol: rol
  });

  res.json(user);
};

export default usersCtrl;
