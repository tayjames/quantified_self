'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
       return queryInterface.addColumn(
         'MealFoods',//table we are adding the column too
         'FoodId', //the foreign key that we are adding
         {
          type: Sequelize.INTEGER,
          references: {
            model: 'Food', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
       )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "MealFoods", // name of Source model
      "MealId" // key we want to remove
    );
  }
};
