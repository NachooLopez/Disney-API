const { Sequelize, DataTypes } = require("sequelize");
const CharacterModel = require("./models/Character");
const GenreModel = require("./models/Genre");
const MovieModel = require("./models/Movie");
const UserModel = require("./models/User");

const { DB_URI } = process.env;

const sequelize = new Sequelize(DB_URI, {
  logging: false,
  native: false,
});

const Character = CharacterModel(sequelize, DataTypes);
const Genre = GenreModel(sequelize, DataTypes);
const Movie = MovieModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

Character.belongsToMany(Movie, { through: "CharacterMovie" });
Movie.belongsToMany(Character, { through: "CharacterMovie" });
Genre.belongsToMany(Movie, { through: "GenreMovie" });
Movie.belongsToMany(Genre, { through: "GenreMovie" });
User.hasMany(Character);
Character.belongsTo(User);
User.hasMany(Movie);
Movie.belongsTo(User);

module.exports = {
  sequelize,
  Character,
  Genre,
  Movie,
  User,
};
