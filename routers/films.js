var express = require('express');       // imports the express library
var router = express.Router();          // Router object for routes

var filmsModel = require('../models/films.js');         // get an instance of the express Router
var categoriesModel = require('../models/categories.js');

//Gets all the films (Extra credit for “paging: first previous next last”)
router.get('/films', function FilmsGetHandler(request, response){
    filmsModel.getAll(function DoneGettingAll(err, result, fields){
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

//Gets the film with the given id
router.get('/films/:id', function FilmsGetByIdHandler(request, response){
    filmsModel.findById(request.params.id, function DoneGettingById(err, result, fields){
        if (err){
            console.log("Some error finding by id");
            console.log(err);
            response.write("Error finding by id");
        }else {
            response.json(result);
        }
    });
});


//Inserts a film into the films table
router.post('/films',
	// title, description, releaseYear, length, rating, categoryID
	function FilmsPostHandler(request, response){
        filmsModel.insert(
			      request.body.title,
			      request.body.description,
            request.body.releaseYear,
            request.body.length,
            request.body.rating,
            request.body.categoryID,
            function DoneInserting(err, result){
                if (err){
                    console.log("Some error inserting");
                    console.log(err);
                    response.write("Error Inserting");
                }else{
								response.json(result);
							  }
		        });
});





//Modifies a film record
router.put('/films',
	// title, description, releaseYear, length, rating, categoryID
	function FilmsPutHandler(request, response){
        filmsModel.update(
            request.body.title,
            request.body.description,
            request.body.releaseYear,
            request.body.length,
            request.body.rating,
			      request.body.categoryID,
            request.body.filmID,
            function DoneInserting(err, result){
                if (err){
                    console.log("Some error updating");
                    console.log(err);
                    response.write("Error updating");
                }else{
                    response.json(result);
                }
            } );
});

//Deletes a film record
router.delete('/films',
	function FilmsDeleteHandler(request, response){
        filmsModel.delete(
			request.body.filmID,
            function DoneInserting(err, result){
                if (err){
                    console.log("Some error deleting");
                    console.log(err);
                    response.write("Error deleting");
                }else{
                    response.json({deletedRow: result});
                }
            } );
});

//Gets all the films with their respective category
router.get('/films-categories', function FilmsGetHandler(request, response){
    filmsModel.getAllTables(function DoneGettingAll(err, result, fields){
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

//Gets all the films with their respective category by id
router.get('/films-categories/:id', function FilmsGetHandler(request, response){
    filmsModel.findByIdWithCategory(request.params.id,function DoneGettingAll(err, result, fields){
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
module.exports = router;
