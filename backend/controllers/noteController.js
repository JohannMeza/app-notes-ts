const Note = require("../models/Note");

const index = async(req, res) => {
  try {
    const { userId } = req.body;
    const note = await Note.findAll({ where: { archived: false, userId }, order: [['updatedAt', 'DESC']] });
    return res.status(200).json([ ...note ]);
  } catch (error) {
    return res.status(error.status || 500).json({ ...error })
  }
}

const indexArchived = async(req, res) => {
  try {
    const { userId } = req.body;
    const note = await Note.findAll({ where: { archived: true, userId }, order: [['updatedAt', 'DESC']] });
    return res.status(200).json([ ...note ]);
  } catch (error) {
    return res.status(error.status || 500).json({ ...error })
  }
}

const store = async(req, res) => {
  try {
    const { note, archived, color, userId, categorieId } = req.body;
    await Note.create({ note, archived, color, userId, categorieId });
    return res.status(200).json({ message: 'Created note' });
  } catch (error) {
    return res.status(error.status || 500).json({ ...error })
  }
}

const update = async(req, res) => {
  try {
    const { note, archived, color, id } = req.body;
    const foundNote = await Note.findByPk(id);
    console.log(req.body)
    await foundNote.update({ note, archived, color, id });
    return res.status(200).json({ message: 'Update note' });
  } catch (error) {
    return res.status(error.status || 500).json({ ...error });
  }
}

const del = async(req, res) => {
  try {
    const { id } = req.params;
    const foundNote = await Note.findByPk(id);
    await foundNote.destroy();
    return res.status(200).json({ message: 'Delete note' });
  } catch (error) {
    return res.status(error.status || 500).json({ ...error });
  }
}

module.exports = {
  index,
  indexArchived,
  store,
  update,
  del
}