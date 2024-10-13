const express = require('express');
const router = express.Router();
const Note = require('../models/NotesModel'); 


//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
// app.post('/notes', (req, res) => {
//     // Validate request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "Note content can not be empty"
//         });
//     }
//     //TODO - Write your code here to save the note
// });

// Creating a new Note
router.post('/notes', (req, res) => {
    // Validate request
    if (!req.body.noteTitle || !req.body.noteDescription) {
        return res.status(400).send({
            message: "Note title and description cannot be empty"
        });
    }

    // Creating a Note
    const note = new Note({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority || 'MEDIUM'
    });

    // Saveing the Note in the database
    note.save()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
            message: err.message || "Some error occurred while creating the note."
        }));
});


//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
// app.get('/notes', (req, res) => {
//     // Validate request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "Note content can not be empty"
//         });
//     }
//     //TODO - Write your code here to returns all note
// });

// Retrieve all Notes
router.get('/notes', (req, res) => {
    Note.find()
        .then(notes => res.send(notes))
        .catch(err => res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        }));
});


//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
// app.get('/notes/:noteId', (req, res) => {
//     // Validate request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "Note content can not be empty"
//         });
//     }
//     //TODO - Write your code here to return onlt one note using noteid
// });

// Retrieve a single Note by ID
router.get('/notes/:noteId', (req, res) => {
    Note.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        })
        .catch(err => res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        }));
});


//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
// app.put('/notes/:noteId', (req, res) => {
//     // Validate request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "Note content can not be empty"
//         });
//     }
//     //TODO - Write your code here to update the note using noteid
// });

// Update a Note by ID
router.put('/notes/:noteId', (req, res) => {
    // Validate request
    if (!req.body.noteTitle || !req.body.noteDescription) {
        return res.status(400).send({
            message: "Note title and description cannot be empty"
        });
    }

    // Find note and update it
    Note.findByIdAndUpdate(req.params.noteId, {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority || 'MEDIUM',
        dateUpdated: Date.now()
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        })
        .catch(err => res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        }));
});


//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
// app.delete('/notes/:noteId', (req, res) => {
//     // Validate request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "Note content can not be empty"
//         });
//     }
//     //TODO - Write your code here to delete the note using noteid
// });

// Delete a Note by ID
router.delete('/notes/:noteId', (req, res) => {
    Note.findByIdAndDelete(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        })
        .catch(err => res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        }));
});

module.exports = router;