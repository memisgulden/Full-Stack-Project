// Requiring our models
var db = require("../models/lunch.js");
var express = require('express');

// Routes
module.exports = function (app) {
  // GET all groups
  app.get("/api/groups", function (req, res) {
    db.findAll({
      attributes:
      ['group_name'], group: ['group_name']
    })
      .then(function (data) {
        res.json(data);
      })
  });

  // GET all users of a group
  app.get("/api/groups/:group", function (req, res) {
    db.findAll({
      where: {
        group_name: req.params.group
      },
      attributes:
      ['group_name', 'user_name']
    })
      .then(function (data) {
        res.json(data);
      })
  });

  // POST a new group
  app.post("/api/newGroup", function (req, res) {
    console.log(req.body);
    db.create({
      group_name: req.body.group_name
      // user_name: req.body.user_name
    }).then(function (data) {
      res.json(data);
    });
  });

  // POST a new restaurant 
  app.post("/api/newRestaurant", function (req, res) {
    console.log(req.body);
    db.create({
      group_name: req.body.group_name,
      user_name: req.body.user_name,
      restaurant_name: req.body.restaurant_name,
      address: req.body.address,
      phone: req.body.phone,
      rating: req.body.rating,
      photo: req.body.photo,
      website: req.body.website,
    })
      .then(function (data) {
        res.json(data);
      });
  });

  // GET a random restaurant
  app.get("/api/pickRestaurant/:group", function(req, res){
    db.findAll({
      where: {
        group_name: req.params.group,
        restaurant_name:{
          $ne: null
        }
      },
      attributes:
      ['restaurant_name', 'address', 'phone', 'rating', 'photo', 'website']
  }).then(function (data) {
    res.json(data);
  })
});

};