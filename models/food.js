'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER
  }, {});
  Food.associate = function(models) {
    // associations can be defined here
    this.belongsToMany(models.Meal, {through: models.MealFood, foreignKey: 'FoodId', onDelete: 'CASCADE'})
  };
  return Food;
};
