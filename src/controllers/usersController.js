const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const languageArr = [
  "HTML",
  "CSS",
  "Javascript",
  "Typescript",
  "Python",
  "Java",
  "PHP",
  "GO",
  "Swift",
  "Ruby",
  "Rust",
  "C",
  "C++",
  "C#",
  "SQL",
];

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
    console.log(languages);
    await languages.forEach((e) => {
      console.log(e);
      if (!languageArr.includes(e.label)) {
        return res.status(500).json("INVALID LANGUAGE");
      }
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
          connect: { id: 1 },
        },
      },
    });
    console.log("Created Code Snippet: ", codeSnippet);
    res.status(200).json(codeSnippet);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const add_github = async (req, res, next) => {
  try {
    const { username } = req.body;
    const { id } = await req.body;
    console.log("id: ", id);
    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
    });
    if (!user) {
      return res.status(500).json();
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        githubUsername: username,
      },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
};

const add_leetcode = async (req, res, next) => {
  try {
    const { username } = req.body;
    const { id } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
    });
    if (!user) {
      return res.status(500).json();
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        leetCodeUsername: username,
      },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
};

const params_test = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("USER ID: ", id);
    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
    });
    if (!user) {
      res.status(500).json("No user found");
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

const params_test_info = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      },
      include: {
        codeSnippets: true,
      },
    });
    if (!user) {
      return res.status(500).json("No user found");
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json("Error");
  }
};

module.exports = {
  add_language,
  add_language_learn,
  add_language_test,
  add_project_test,
  add_code_test,
  add_github,
  add_leetcode,
  params_test,
  params_test_info,
  all_users,
  one_user,
  delete_user,
};
