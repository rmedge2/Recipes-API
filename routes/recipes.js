const { randomInt } = require('crypto');
var express = require('express');
var router = express.Router();
const fs = require('fs');

const RECIPES_FILE = './data/recipes.json';

/* GET recipes listing. */
router.get('/', function (req, res, next) {
  fs.readFile(RECIPES_FILE, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('There was a problem loading the recipes.');
      return;
    }
    res.json(JSON.parse(data));
  })
});


// Time to get a random recipe
router.get('/random', (req, res) => {
  fs.readFile(RECIPES_FILE, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('There was a problem loading the recipe.');
      return;
    }
    const recipes = JSON.parse(data)

    let randomID = Math.floor(Math.random() * (recipes.length))
    console.log(randomID)
    const randomRecipe = recipes.find(recipe => recipe.id == randomID);
    if (!randomRecipe) {
      res.status(404).send('Recipe not found.');
      return;
    }
    res.json(randomRecipe)
  })
})

// Getting a single recipe by id
router.get('/:id', (req, res) => {
  fs.readFile(RECIPES_FILE, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('There was a problem loading the recipe.')
      return;
    }
    const recipes = JSON.parse(data);
    const singleRecipe = recipes.find(recipe => recipe.id === parseInt(req.params.id));
    console.log(req.params);
    if (!singleRecipe) {
      res.status(404).send('Recipe not found.');
      return;
    }
    res.json(singleRecipe)
  })
})

// Adding a new recipe
router.post('/', (req, res)=> {
  fs.readFile(RECIPES_FILE, 'utf-8', (err,data) => {
    if(err){
      console.error(err);
      res.status(500).send('There was a problem reading the data')
    }
    const recipes = JSON.parse(data)

    // Now create a new recipe object
    let newRecipe = {
      id: (recipes.length + 1),
      name: req.body.name,
      style: req.body.style,
      prep_time: req.body.prep_time,
      cook_time: req.body.cook_time,
      instructions: req.body.instructions
    };
    recipes.push(newRecipe);
    res.send(recipes)

    // Now write to the json file
    fs.writeFile(RECIPES_FILE, JSON.stringify(recipes), err => {
      if(err) {
        console.error(err);
        res.status(404).send('Cannot add recipe');
        return;
      }
      
    })  

  })
})

module.exports = router;
