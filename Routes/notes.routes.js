const express = require('express');
const { NoteModel } = require('../Model/notes.model');
const { auth } = require('../MiddleWare/auth.middleWare');

const notesRoute = express.Router();
notesRoute.use(auth);
notesRoute.post('/create', async (req, res) => {
    try {
        const note = new NoteModel(req.body);
        await note.save();
        res.status(200).json({ msg: "new note is Added" , note : req.body})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
notesRoute.get('/', async (req, res) => {
    try {
        let note = await NoteModel.find({ userID: req.body.userID });
        res.send(note);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
notesRoute.patch('/update/:noteID', async (req, res) => {
const userIDinUserDoc = req.body.userID;
const {noteID} = req.params;
const note = await NoteModel.findOne({_id : noteID});
const userIDinNoteDoc = note.userID;
try {
    if(userIDinNoteDoc===userIDinUserDoc){
        await NoteModel.findByIdAndUpdate({_id:noteID} , req.body);
        res.json({ msg: `${note.title} has been updated` })
    }
    else{
        res.json({ msg: "Not Authorized" }); 
    }
} catch (error) {
    res.json({ error: error.message });
}
})
notesRoute.delete('/delete/:noteID', async (req, res) => {
    const userIDinUserDoc = req.body.userID;
    const {noteID} = req.params;
    const note = await NoteModel.findOne({_id : noteID});
    const userIDinNoteDoc = note.userID;
    try {
        if(userIDinNoteDoc===userIDinUserDoc){
            await NoteModel.findByIdAndDelete({_id:noteID});
            res.json({ msg: `${note.title} has been deleted` })
        }
        else{
            res.json({ msg: "Not Authorized" }); 
        }
    } catch (error) {
        res.json({ error: error.message });
    }
})

module.exports = { notesRoute }