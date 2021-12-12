const router = require('express').Router();
const path = require('path');
const {v4: uuid} = require('uuid');
const fs = require('fs');
//const {Store} = require('../../db/store');
const notes = require('../../db/db.json');

router.get('/notes', (req, res) => res.json(notes));

router.get('/notes/:id', (req, res) => {
    const note = notes.find(c => c.id === parseInt(req.params.id));
    if (!note) res.status(404).send('note not found');
    res.send(note);
});

router.post('/notes', (req, res) => {
    const {title, text} = req.body;
    if (title || text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedNotes = JSON.parse(data);
          parsedNotes.push(newNote);
          fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!')
          );
        }
      });
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.json(response);
      return response;
    } else {
      res.json('Error in posting note');
    }
  });

module.exports = router;