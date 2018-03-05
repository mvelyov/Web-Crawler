'use strict';
module.exports = (sequelize, DataTypes) => {
  const website = sequelize.define('website', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  website.associate = (models) => {
    // associations can be defined here
  };
  return website;
};
