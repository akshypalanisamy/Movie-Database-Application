var express = require('express');       // imports the express library
var router = express.Router();          // Router object for routes

var filmsModel = require('../models/films.js');         // get an instance of the express Router
var categoriesModel = require('../models/categories.js');


//Gets all the categories
router.get('/categories', function CategoriesGetHandler(request, response){
    categoriesModel.getAll(function DoneGettingAll(err, result, fields){
        if (err) {
            console.log("Some error selecting all");
            console.log(err);
            response.write("Error Getting All");
        } else {
            console.log("Successfully retrieve all records");
            response.json(result);
        }
    });
});

//Gets the category with the given id
router.get('/categories/:id', function CategoriesGetByIdHandler(request, response){
    categoriesModel.findById(request.params.id, function DoneGettingById(err, result, fields){
        if (err){
            console.log("Some error finding by id");
            console.log(err);
            response.write("Error finding by id");
        }else {
            response.json(result);
        }
    });
});

//Inserts a category into the categories table
router.post('/categories',
	function FilmsPostHandler(request, response){
        categoriesModel.insert(
			      request.body.categoryName,
            function DoneInserting(err, resultName){
                if (err){
                    console.log("Some error inserting");
                    console.log(err);
                    response.write("Error Inserting");
                }else{
								response.json({ insertedCategory: resultName });
							}
		});
  }
);

module.exports = router;
