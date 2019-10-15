'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING
  }, {});
  Meal.associate = function(models) {
    // associations can be defined here
    this.belongsToMany(models.Food, {through: models.MealFood, foreignKey: 'MealId', onDelete: 'CASCADE'})
  };
  return Meal;
};
