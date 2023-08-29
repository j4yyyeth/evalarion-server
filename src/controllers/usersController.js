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
        id: userId
      }
    })
    if (!user) {
      return res.status(400).json("No user found");
    }
    res.json(user);
  } catch (err) {
    console.log(err);
  }
}

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
  one_user,
  delete_user,
};
