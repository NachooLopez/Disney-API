require("dotenv").config();
const app = require("./src/app");
const { sequelize } = require("./src/db");

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log(">>> DB connected.");
    await sequelize.sync({ force: false });
    console.log(">>> DB Synchronized.");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
