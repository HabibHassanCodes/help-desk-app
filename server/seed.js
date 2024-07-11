const { helpRequestFormSeed, userSeed } = require("./seedData");

const { db } = require("./db/db");
const { HelpRequestForm, User } = require("./models/index");

const seed = async () => {
  try {
    // drop and recreate tables per model definitions
    await db.sync({ force: true });

    // insert data
    await HelpRequestForm.bulkCreate(helpRequestFormSeed);
    await User.bulkCreate(userSeed);

    console.log("db populated!");
  } catch (error) {
    console.error(error);
  }
};

seed();