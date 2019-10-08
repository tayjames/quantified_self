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

module.exports = router;
