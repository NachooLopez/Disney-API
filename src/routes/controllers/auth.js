const { User } = require("../../db");
const {
  comparePassword,
  hashPassword,
} = require("../../utils/passwordManagment");
const { generateToken } = require("../../utils/tokenManagment");
const sendEmail = require("../../utils/sendEmail");

const register = async (req, res) => {
  const [userExists] = await User.findAll({ where: { email: req.body.email } });
  const { email, password } = req.body;

  if (userExists)
    return res.status(400).json({ error: "That user already exists" });

  try {
    const newUser = await User.create({
      email,
      password: await hashPassword(password),
    });
    sendEmail(newUser.email);
    res.status(201).json({ message: "User created successfully", email });
  } catch (e) {
    res.status(404).send("There was an error, please, try again.");
    console.log(e);
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!(email && password))
      return res
        .status(400)
        .json({ error: "Email and password must be completed" });
    const user = await User.findOne({ where: { email } });
    const isPasswordCorrect = user
      ? await comparePassword(password, user.password)
      : false;

    if (isPasswordCorrect) {
      const token = generateToken(user.id);
      return res.status(200).json({ token });
    }
    res.status(400).json({ error: "Incorrect email or password" });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  register,
  login,
};
