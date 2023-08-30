const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const languageArr = ["HTML", "CSS", "Javascript", "Typescript", "Python", "Java", "PHP", "GO", "Swift", "Ruby", "Rust", "C", "C++", "C#", "SQL"];

const all_users = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        codeSnippets: true,
      },
    });
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
    });
  } catch (err) {
    console.log(err);
  }
};

const add_project_test = async (req, res, next) => {
  try {
    const { projectName } = req.body;
    const languages = req.body;
    console.log("PROJECT: ", projectName);
    languages.forEach((e) => {
      console.log("Language: ", e.label);
    });
  } catch (err) {
    console.log(err);
  }
};

const add_code_test = async (req, res, next) => {
  try {
    const { language, code } = req.body;
    console.log("CODE BLOCK LANGUAGE:", language);
    console.log("CODE SNIPPET: ", code);
    const codeSnippet = await prisma.codeSnippet.create({
      data: {
        codeBlock: code,
        language: language,
        User: {
          connect: { id: 14 },
        },
      },
    });
    console.log("Created Code Snippet", codeSnippet);
    res.status(200).json(codeSnippet);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};



module.exports = {
  add_language,
  add_language_learn,
  add_language_test,
  add_project_test,
  add_code_test,
  //
  all_users,
  one_user,
  delete_user,
};
