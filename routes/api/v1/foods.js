var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;

router.get("/", function(req, res, next) {
  Food.findAll()
    .then(foods => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(foods));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
});

router.get("/:id", function(req, res, next) {
  Food.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(food => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(food));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
});

router.post("/", function(req, res, next) {
  Food.create({
    name: req.body.name,
    calories: req.body.calories
  })
  .then(food => {
    res.setHeader("Content-Type", "application/json");
    res.status(201).send(JSON.stringify(food));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send({error});
  });
});

router.put("/:id", function(req, res, next) {
  Food.update(
    {
      name: req.body.name,
      calories: req.body.calories
    },
    {
      returning: true,
      where: {
        id: parseInt(req.params.id)
      }
    }
  )
    .then(([rowsUpdate, [updatedFood]]) => {
      res.setHeader("Content-Type", "application/json");
      res.status(202).send(JSON.stringify(updatedFood));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send({error});
    });
});

router.delete("/:id", function(req, res, next) {
  Food.findOne({
    where: {
      id: req.params.id,
    }
  })
  .then(food => {
    if (food) {
      return food.destroy()
      .then(comida => {
        response.setHeader("Content-Type", "application/json");
        response.status(204).send(JSON.stringify(comida))
      })
      .catch(error => {
        response.setHeader("Content-Type", "application/json");
        response.status(500).send({error});
      })
    } else {
      response.setHeader("Content-Type", "application/json");
      response.status(404).send(JSON.stringify("Food not found!"));
    }
  })
})

module.exports = router;
