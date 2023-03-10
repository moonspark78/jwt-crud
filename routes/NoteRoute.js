const express = require('express')
const Note = require('../models/note')
const NoteRouter = express.Router();

// Create a note
NoteRouter.post('/add/notes', async (req, res) => {
    try {
        const {title, body} = req.body
        if(!title || !body ) {
            return res.status(400).send({
                success: false, 
                message: "Il manque des données"
            });
        }
        let note = new Note({title, body})
        await note.save();
        return res.status(200).send({
            success: true,
            message: "Une note a bien étais enregistrer",
            // Cette ligne permet d'afficher le model author rempli avec les info mis dans postman
            note
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
})


// READ Note
NoteRouter.get('/read/notes', async (req, res) => {
    let notes = await Note.find({})
    return res.status(200).send({
        success: true,
        notes
    });
});
// READ Note by ID
NoteRouter.get('/read/note/:id', async (req, res) => {
    try {
        const {id} = req.params
        let note = await Note.findById(id)
        if(!note){
            return res.status(404).send({
                success: false,
                message: "La note n'a pas était Trouvé",
            })
        }
        return res.status(200).send({
            success: true,
            message: "La note a était Trouver",
            note
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
});

// Upadate a Note

NoteRouter.put('/update/notes/:id', async (req, res) => {
    const {id} = req.params
    const {title, body} = req.body
    let note = await Note.findByIdAndUpdate(id, {title: title, body: body});
    res.status(200).send({
        success: true,
        message: "Note is modified",
        note,
    })
});

// delete a Note
NoteRouter.delete("/delete/notes/:id", async (req, res) =>{
    try {
        const {id} = req.params
        await Note.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "The note is deleted"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});


module.exports = NoteRouter;