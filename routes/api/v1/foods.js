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
      if (food) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(food));
    } else {
      res.setHeader('Content-Type', "application/json");
      res.status(404).send(JSON.stringify("No food found"))
    }
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
});

router.post("/", function(req, res, next) {
  if (req.body.name && req.body.calories) {
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
      res.status(500).send({error});
    });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify("Remember to provide both the food name and its calories."))
  }
});

router.patch("/:id", function(req, res, next) {
  if (req.body.name && req.body.calories) {
    Food.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(food => {
      if (food) {
        food.update({
          name: req.body.name,
          calories: req.body.calories
        })
        .then(update => {
          res.setHeader("Content-Type", "application/json");
          res.status(202).send(JSON.stringify(update));
        })
        .catch(error => {
          res.setHeader("Content-Type", "application/json");
          res.status(500).send({error})
        })
      }
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify("Remember to provide both the food name and its calories."))
  }
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
      .then(destroy => {
        res.setHeader("Content-Type", "application/json");
        res.status(204).send()
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).send({error});
      })
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(404).send(JSON.stringify("Food not found!"));
    }
  })
})

module.exports = router;
