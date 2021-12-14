const router = require('express').Router();
const {v4: uuid} = require('uuid');
const fs = require('fs');
const notes = require('../../db/db.json');

router.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let savedNotes = JSON.parse(data);
      res.json(savedNotes);
    }
  });
});

router.post('/notes', (req, res) => {
    const {title, text} = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          let savedNotes = JSON.parse(data);
          savedNotes.push(newNote);
          fs.writeFile(
            './db/db.json',
            JSON.stringify(savedNotes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!')
          );
        }
      });
      res.json();
    } else {
      res.json('Error in posting note');
    }
});

router.delete('/notes/:id', (req, res) => {

});

module.exports = router;