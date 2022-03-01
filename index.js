require("dotenv").config();
const app = require("./src/app");
const { sequelize, Genre } = require("./src/db");

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log(">>> DB connected.");
    await sequelize.sync({ force: false });
    await Genre.bulkCreate([
      { name: "Action", image: "Action.jpg" },
      { name: "Comedy", image: "Comedy.jpg" },
      { name: "Fantasy", image: "Fantasy.jpg" },
      { name: "Historical", image: "Historical.jpg" },
      { name: "Horror", image: "Horror.jpg" },
      { name: "Science fiction", image: "Science fiction.jpg" },
    ]);
    console.log(">>> DB Synchronized.");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
