'use strict';
module.exports = (sequelize, DataTypes) => {
  const os = sequelize.define('os', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  os.associate = (models) => {
    // associations can be defined here
  };
  return os;
};
