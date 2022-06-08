const fs = require('fs');
const db = require('./db/db.json');
const uuid = require('uuid');

module.exports = function (app) {
    app.get('/api/notes', function (req, res) {
        fs.readFile(__dirname + '/.db/db.json', (err, data) => {
            if (err) throw error;

            res.json(JSON.parse(data));
        });
    });

app.post("/api/notes", function (req, res) {
    let notes = [];
    let newNotes = {
        title: req.body.title,
        text: req.body.text,
        id: uuid.v4(),
    }
    fs.readFile(__dirname + "/./db/db.json", (err, data) => {
        if (err) throw err;
        notes = JSON.parse(data);
        notes.push(newNotes);
        fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(notes), (err) => {
            if (err) throw err;
            console.log("The note has been saved.")
            res.end();
        })
    })
    console.log(newNotes)
});


app.delete("/api/notes/:id", (req, res) => {
    let noteId = req.params.id;
    fs.readFile(__dirname + "/../db/db.json", (err, data) => {
        if (err) throw err;
        let notesDB = JSON.parse(data);
        const filteredNotes = notesDB.filter(values => values.id != noteId);
        fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(filteredNotes), err => {
            if (err) throw err;
            console.log("The note's selected has been deleted.")
            res.end();
        })});
    });
};