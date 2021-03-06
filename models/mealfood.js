'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealFood = sequelize.define('MealFood', {
    MealId: DataTypes.INTEGER,
    FoodId: DataTypes.INTEGER
  }, {});
  MealFood.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.Meal)
    this.belongsTo(models.Food)
  };
  return MealFood;
};
