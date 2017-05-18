var http = require("http");
var fs = require("fs");
var express = require("express");
var app = express();
var sqlite = require('sqlite');
var mustache = require('mustache');

sqlite.open('./database.sqlite').then(function(db) {
    
    app.use(express.static(__dirname + '/public'));

    app.get('/courses', function (req, res) {
        db.all("SELECT * FROM Courses").then(function(rows) {
            var file = fs.readFileSync('Template/courses-page.mst', "utf8")
            var html = mustache.to_html(file, {courses: rows});
            return res.send(html);
        });
    });
    
     app.get('/courses/search/:term', function (req, res) {
        db.all(
            "SELECT * FROM Courses WHERE name LIKE '%' ||$term|| '%'",
            {$term: req.params.term || req.query.term}
            ).then(function(rows) {
            var file = fs.readFileSync('Template/courses-page.mst', "utf8")
            var html = mustache.to_html(file, {courses: rows});
            return res.send(html);
        });
    });
    
     app.get('/course/:id', function (req, res) {
        db.get(
            "SELECT * FROM Courses WHERE id = $id",
            {$id: req.params.id}
            ).then(function(row) {
            var file = fs.readFileSync('Template/single-course-page.mst', "utf8")
            var html = mustache.to_html(file, {course: row});
            console.log(row);
            return res.send(html);
        });
    });
    
    var server = http.createServer(app);
    console.log("Listening on http://127.0.0.1:8080");
    server.listen('8080', '127.0.0.1');

}).catch(function(err){
    console.error(err.stack);
});




