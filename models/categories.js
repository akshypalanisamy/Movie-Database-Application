var db = require('../db');


//Gets all the categories
exports.getAll = function GetAllHandler(done){
    db.get().query(
        'SELECT * FROM categories', function SelectQueryHandler(err, result, fields){
            if (err)
                return done(err);
            done(null, result, fields);
        });
};

//Gets the category with the given id
exports.findById = function FindByIdHandler(id, done){
    db.get().query(
        'SELECT * FROM categories WHERE category_id = ?', id,
        function SelectQueryHandler(err, result, fields){
            if (err)
                return done(err);
            done(null, result, fields);
        });
};



//inserts a category into the categories table
exports.insert = function InsertHandler(name, done){
    var values = [name];
    db.get().query(
        'INSERT INTO categories (name) ' +
        'VALUES (?)', values, function InsertQueryHandler(err, result){
            if (err)
                return done(err);
            done(null, result.insertId);
        });
};
