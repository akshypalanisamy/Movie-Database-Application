var db = require('../db');

//Gets all the films
exports.getAll = function GetAllHandler(done){
    db.get().query(
        'SELECT * FROM films', function SelectQueryHandler(err, result, fields){
            if (err)
                return done(err);
            done(null, result, fields);
        });
};

//Gets the film with the given id
exports.findById = function FindByIdHandler(id, done){
    db.get().query(
        'SELECT * FROM films WHERE film_id = ?', id,
        function SelectQueryHandler(err, result, fields){
            if (err)
                return done(err);
            done(null, result, fields);
        });
};


//Inserts a film into the films table
exports.insert = function InsertHandler(title, description, releaseYear, length, rating, categoryID, done){
    var values = [title, description, releaseYear, length, rating, categoryID];
    db.get().query(
        'INSERT INTO films (title, description, release_year, length, rating, category_id) ' +
        'VALUES (?,?,?,?,?,?)', values, function InsertQueryHandler(err, result){
            if (err)
                return done(err);
            done(null, result);
        });
};

//Modifies a film record
exports.update = function UpdateHandler(title, description, releaseYear, length, rating, categoryID, filmID, done){
  var values = [title, description, releaseYear, length, rating, categoryID, filmID];
    db.get().query(
        'UPDATE films SET title = ?, description = ?, release_year = ?, length = ?, rating = ?, category_id=? ' +
        'WHERE film_id = ?', values, function InsertQueryHandler(err, result){
            if (err)
                return done(err);
            done(null, result.affectedRows);
        });
};

//Deletes a film record
exports.delete = function DeleteHandler(filmID, done){
    db.get().query(
        'DELETE FROM films WHERE film_id = ?', filmID,
        function DeleteQueryHandler(err, result){
            if (err)
                return done(err);
            console.log(result);
            done(null, result.affectedRows); // Number of deleted records
        }
    );
};

//Gets all the films with their respective category
exports.getAllTables= function GetAllTypesHandler(done){
    db.get().query(
        'SELECT film_id, title, description, release_year, length, rating, name FROM films JOIN categories ON categories.category_id = films.category_id',
        function SelectQueryHandler(err, result, fields){
            if (err)
                return done(err);
            done(null, result, fields);
        });
};


//Gets all the films with their respective category
exports.findByIdWithCategory= function FindByIdAllHandler(filmID, done){
    db.get().query(
        'SELECT film_id, title, description, release_year, length, rating, name FROM films JOIN categories ON categories.category_id = films.category_id AND film_id=?',filmID,
        function SelectQueryHandler(err, result, fields){
            if (err)
                return done(err);
            done(null, result, fields);
        });
};
