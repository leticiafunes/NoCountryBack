const usersCtrl = {};

const User = require("../models/User");

usersCtrl.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

usersCtrl.createUser = async (req, res) => {
  const { username, nombre, apellido, password, nivel } = req.body;
  const newUser = new User({
    username,
    nombre,
    apellido,
    password,
    nivel,
  });
  await newUser.save();
  res.json("Usuario Creado");
};

usersCtrl.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: ["Borrar Usuario"] });
};

usersCtrl.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

usersCtrl.getUserByUsername = async (req, res) => {
  const filter = { username: req.params.id };
  const user = await User.find(filter);
  res.json(user);
};

usersCtrl.updateUser = async (req, res) => {
  const { username, nombre, apellido, password, nivel } = req.body;
  const filter = { _id: req.params.id };
  const user = await User.findOneAndUpdate(filter, {
    username,
    nombre,
    apellido,
    password,
    nivel,
  });

  res.json(user);
};

module.exports = usersCtrl;
