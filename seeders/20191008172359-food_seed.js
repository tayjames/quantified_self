'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Food', [
      {
      "name": "Banana",
      "calories": 150,
      "createdAt": new Date(),
      "updatedAt": new Date()
      },
      {
      "name": "Apple",
      "calories": 200,
      "createdAt": new Date(),
      "updatedAt": new Date()
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Foods', null, {});
  }
};
