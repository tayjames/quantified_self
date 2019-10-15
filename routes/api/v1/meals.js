var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
var Meal = require('../../../models').Meal;
var MealFood = require('../../../models').MealFood;

router.post('/', function(req, res, next){
  res.setHeader("Content-Type", "application/json");
  if (req.body.name)
    {
        Meal.create({
          name: req.body.name
        })
        .then(res.status(201).send("Meal Created"))
    }
});

router.post('/:MealId/foods/:FoodId', async function(req, res, next){
  res.setHeader("Content-Type", "application/json")
  let food = await Food.findOne( { where: {
                                    id: req.params.FoodId
                                    }
                                  }
                                )
  let meal = await Meal.findOne( { include: Food,
                                   where: {
                                     id: req.params.MealId
                                   }
                                 }
                               )
  if (meal && food) {
      let mealfood = await MealFood.findOne(
         { where: {
           MealId: meal.id,
           FoodId: food.id
            }
         })
      if (mealfood) {
        res.status(400).send(JSON.stringify("Already exists in meal."))
      } else {
        await MealFood.create( {
          FoodId: food.id,
          MealId: meal.id
        })
        res.status(201).send(JSON.stringify(`${food.name} added to ${meal.name}.`))
      }
  } else {
    res.status(404).send(JSON.stringify(food,meal))
  }
})

router.get('/', function(req, res, next) {
  res.setHeader("Content-Type", "application/json")
    Meal.findAll({ include: [{
                        model: Food,
                        attributes: ["id", "name", "calories"]
                            }]
                })
  .then( meals => res.status(200).send(JSON.stringify(meals)) )
  .catch( error => res.status(204).send({error}) )
})

router.get('/:MealId/foods', function(req, res, next) {
  res.setHeader("Content-Type", "application/json")
  Meal.findOne({
    where: {
      id: req.params.MealId
    },
    include: [{ model: Food,
                attributes: ["id", "name", "calories"]
              }]
  })
  .then( meals => res.status(200).send(JSON.stringify(meals)) )
  .catch( error => res.status(204).send({error}))
})

router.delete('/:MealId/foods/:FoodId', function(req, res, next) => {
  res.setHeader("Content-Type", "application/json")
  let food = await Food.findOne( { where: {
                                    id: req.params.FoodId
                                    }
                                  }
                                )
  let meal = await Meal.findOne( { include: Food,
                                   where: {
                                     id: req.params.MealId
                                   }
                                 }
                               )
  if (meal && food){
    await MealFood.destroy({ where: {
                              FoodId: food.id,
                              MealId: meal.id
                            }
                          })
    res.status(204).send(JSON.stringify(`${food.name} removed from ${meal.name}.`))
  } else {
    res.status(400).send(JSON.stringify("Bad Request"))
  }
})




module.exports = router
