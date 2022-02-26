module.exports = (sequelize, DataTypes) =>
  sequelize.define("movie", {
    image: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creationDate: {
      type: DataTypes.DATEONLY,
    },
    rating: {
      type: DataTypes.DECIMAL,
      validate: {
        min: 1,
        max: 5,
      },
    },
  });
