require("dotenv").config();
const app = require("./src/app");
const { sequelize } = require("./src/db");

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() =>
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
  )
  .catch((e) => console.log(e));
