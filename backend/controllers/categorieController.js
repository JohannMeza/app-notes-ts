const Categorie = require("../models/Categorie");
const Note = require("../models/Note");

const index = async(req, res) => {
  try {
    const { userId } = req.body;
    const categorie = await Categorie.findAll({ where: { userId }, order: [['updatedAt', 'DESC']] });
    return res.status(200).json(categorie);
  } catch (error) {
    return res.status(error.status || 500).json({ ...error })
  }
}

const indexNotes = async(req, res) => {
  try {
    const { userId } = req.body;
    const { categorieId } = req.body;
    const notes = await Note.findAll({ where: { categorieId, archived: false, userId }, order: [['updatedAt', 'DESC']] });
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(error.status || 500).json({ ...error })
  }
}

const store = async(req, res) => {
  try {
    const { categorie, userId } = req.body;
    await Categorie.create({ categorie, userId });
    return res.status(200).json({ message: 'Created categorie' });
  } catch (error) {
    return res.status(error.status || 500).json({ ...error })
  }
}

const update = async(req, res) => {
  try {
    const { categorie, id } = req.body;
    const foundCategorie = await Categorie.findByPk(id);
    await foundCategorie.update({ categorie, id });
    return res.status(200).json({ message: 'Update categorie' });
  } catch (error) {
    return res.status(error.status || 500).json({ ...error })
  }
}

const del = async(req, res) => {
  try {
    const { id } = req.params;
    await Note.update({ categorieId: null }, { where: { categorieId: id } });
    const foundCategorie = await Categorie.findByPk(id);
    await foundCategorie.destroy();
    return res.status(200).json({ message: 'Delete categorie' });
  } catch (error) {
    return res.status(error.status || 500).json({ ...error })
  }
}

module.exports = {
  index,
  indexNotes,
  store,
  update,
  del,
}