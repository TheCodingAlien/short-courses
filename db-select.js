var sqlite = require('sqlite');

sqlite.open('./database.sqlite').then(function(db) {
    
    db.all("SELECT * FROM Courses").then(function(rows) {
            console.log(rows)
    });
    
}).catch(function(err) {
       
    console.error(err.stack);
});