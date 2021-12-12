const router = require('express').Router();
const uuid = require('uuid');
const fs = require('fs');
//const {Store} = require('../../db/store');
const notes = require('../../db/db.json');

router.get('/api/notes', (req, res) => {
    return res.json(notes);
});

router.get('/api/notes/:id', (req, res) => {
    const note = notes.find(c => c.id === parseInt(req.params.id));
    if (!note) res.status(404).send('note not found');
    res.send(note);
});

router.post('/api/notes', (req, res) => {
    const {title, text} = req.body;
    if (title || text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

    fs.readFile('../../db/db.json', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNotes = JSON.parse(data);
  
          // Add a new review
          parsedNotes.push(newNote);
  
          // Write updated reviews back to the file
          fs.writeFile(
            '../../db/db.json',
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
    } else {
      res.json('Error in posting note');
    }
  });

module.exports = router;