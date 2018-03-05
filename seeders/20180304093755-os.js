'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('os', [{
        name: 'Windows 10',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: 'MacOS',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
},

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
