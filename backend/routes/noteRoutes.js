const NoteRoute = require('express').Router();
const noteController = require('../controllers/noteController');
const auth = require('../middleware/authMiddleware');
const verifyToken = require('../middleware/verifyTokenMiddleware');

NoteRoute.post("/", [verifyToken, auth], noteController.index);
NoteRoute.post("/archived", [verifyToken, auth], noteController.indexArchived);
NoteRoute.post("/store", [verifyToken, auth], noteController.store);
NoteRoute.put("/update", [verifyToken, auth], noteController.update);
NoteRoute.delete("/delete/:id", [verifyToken, auth], noteController.del);

module.exports = NoteRoute