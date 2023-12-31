const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const sign_up = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Please fill out all fields");
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(400).json("User already taken");
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPass = bcrypt.hashSync(password, salt);
    const createdUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPass,
      },
    });
    const payload = {
      id: createdUser.id,
      email: createdUser.email,
    };
    const token = jwt.sign(payload, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: "24hr", // session time
    });
    console.log("Created User: ", createdUser);
    res
      .status(200)
      .json({ token: token, createdUser: createdUser, payload: payload });
    console.log("Created User: ", createdUser);
    console.log("token: ", token);
    console.log("payload: ", payload);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error creating user", details: err.message });
    console.log(err.message);
  }
};

const sign_in = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Please fill out both fields");
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!existingUser) {
      return res.status(400).json("Incorrect login information");
    }
    const doesMatch = bcrypt.compareSync(password, existingUser.password);
    if (!doesMatch) {
      return res.status(400).json("Incorrect login information");
    }
    const payload = {
      id: existingUser.id,
      email: existingUser.email,
    };
    const token = jwt.sign(payload, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: "24hr", // session time
    });
    res.json({
      token: token,
      id: existingUser.id,
    });
  } catch (err) {
    res.status(500).json("Error signing in");
  }
};

const verify = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        projects: true,
        codeSnippets: true,
      },
    });
    const payload = { ...user };
    delete payload.password;
    console.log("PAYLOAD: ", payload);
    res.status(200).json(payload);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  sign_up,
  sign_in,
  verify,
};
