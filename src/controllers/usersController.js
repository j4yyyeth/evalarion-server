const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const all_users = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
};

const one_user = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +userId,
      },
    });
    if (!user) {
      return res.status(400).json("No user found");
    }
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

const delete_user = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const deletedUser = await prisma.user.delete({
      where: {
        id: +userId,
      },
    });
    console.log("DELETED USER: ", deletedUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error deleting user" });
  }
};

/*

  ----- REAL ROUTES ZONE -----

*/

const add_language = async (req, res, next) => {
  try {
    const { language, userId } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: +userId,
      },
    });
    if (!user) {
      console.log("NO USER FOUND!");
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: +userId,
      },
      data: {
        languages: {
          push: language,
        },
      },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
};

const add_language_learn = async (req, res, next) => {
  try {
    const { language, userId } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: +userId,
      },
    });
    if (!user) {
      console.log("NO USER FOUND!");
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: +userId,
      },
      data: {
        languagesToLearn: {
          push: language,
        },
      },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
};

const add_language_test = async (req, res, next) => {
  try {
    const languages = req.body;
    languages.forEach((e) => {
      console.log("Language: ", e.label);
    })
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  add_language,
  add_language_learn,
  add_language_test,
  all_users,
  one_user,
  delete_user,
};
