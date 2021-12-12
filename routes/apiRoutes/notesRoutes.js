const router = require('express').Router();
//const path = require('path');
const {v4: uuid} = require('uuid');
const fs = require('fs');
//const {Store} = require('../../db/store');
let notes = require('../../db/db.json');

router.get('/notes', (req, res) => {
    res.json(notes)});

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
          const savedNotes = JSON.parse(data);
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
  
    //   const response = {
    //     status: 'success',
    //     body: newNote,
    //   };
      //notes = require('./db/db.json');
    //   console.log(newNote);
      res.json(newNote);
    } else {
      res.json('Error in posting note');
    }
});

router.delete('/notes/:id', (req, res) => {

})

module.exports = router;