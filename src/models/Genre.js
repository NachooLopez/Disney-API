module.exports = (sequelize, DataTypes) =>
  sequelize.define("genre", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  });
