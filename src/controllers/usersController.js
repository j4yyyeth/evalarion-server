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

const create_user = async (req, res, next) => {
  try {
    const { email, username } = req.body;
    const user = await prisma.user.create({
      data: {
        email: email,
        username: username,
      },
    });
    console.log("CREATED USER: ", user);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error creating user", details: err.message });
    console.log(err.message);
  }
};

const delete_user = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const deletedUser = await prisma.user.delete({
      where: {
        id: +(userId),
      },
    });
    console.log("DELETED USER: ", deletedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting user" });
  }
};

module.exports = {
  all_users,
  create_user,
  delete_user,
};
