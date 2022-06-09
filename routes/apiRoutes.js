const fs = require("fs");
const db = require("../db/db.json");
//the uuid is added to help create generating a unique ID
const uuid = require("uuid");

//Routing occurs here
module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        fs.readFile(__dirname + "/../db/db.json", (err, data) => {
        if (err) throw err;

        res.json(JSON.parse(data));
        });
    });
  
//Post request occurs here
    app.post("/api/notes", function (req, res) {
        let notesArr = [];
        let newNotes = {
            title: req.body.title,
            text: req.body.text,
            id: uuid.v4(),
        };

        fs.readFile(__dirname + "/../db/db.json", (err, data) => {
            if (err) throw err;

            notesArr = JSON.parse(data);
            notesArr.push(newNotes);

            fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(notesArr), (err, data) => {
                if (err) throw err;

                console.log("The note has been saved!");
                res.end();
            });
        });
        console.log(newNotes)
    });
};