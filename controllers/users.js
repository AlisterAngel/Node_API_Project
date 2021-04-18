const User = require("../models/user");

exports.create = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.register({
      name,
      email
    }, password);

    res.status(200).json({ message: "User was registered successfully", user });
  } catch (error) {
    next(error);
  }
}