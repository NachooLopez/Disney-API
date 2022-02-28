module.exports = (sequelize, DataTypes) =>
  sequelize.define("genre", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmpty: false,
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmpty: false,
      },
    },
  });
