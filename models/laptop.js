'use strict';
module.exports = (sequelize, DataTypes) => {
  const laptop = sequelize.define('laptop', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ram: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    storage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    processor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  laptop.associate = (models) => {
   const {
     brand,
     os,
     website,
   } = models;

   laptop.belongsTo(brand, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });

  laptop.belongsTo(os, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });

  laptop.belongsTo(website, {
    foreignKey: {
      allowNull: false,
    },
    onDelete: 'CASCADE',
  });
  };
  return laptop;
};


