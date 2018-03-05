'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('websites', [{
        name: 'http://www.argos.co.uk/',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: 'https://www.pcworld.co.uk/',
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
