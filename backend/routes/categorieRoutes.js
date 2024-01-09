const CategorieRoute = require('express').Router();
const categorieController = require('../controllers/categorieController');
const auth = require('../middleware/authMiddleware');
const verifyToken = require('../middleware/verifyTokenMiddleware');

CategorieRoute.post("/", [verifyToken, auth], categorieController.index);
CategorieRoute.post("/indexNotes", [verifyToken, auth], categorieController.indexNotes);
CategorieRoute.post("/store", [verifyToken, auth], categorieController.store);
CategorieRoute.put("/update", [verifyToken, auth], categorieController.update);
CategorieRoute.delete("/delete/:id", [verifyToken, auth], categorieController.del);

module.exports = CategorieRoute