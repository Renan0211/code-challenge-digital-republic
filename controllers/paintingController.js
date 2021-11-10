const paintingModel = require('../models/paintingModel');

const getNecessaryCans = async (req, res) => {
  const { walls } = req.body;
  const result = paintingModel.returnNecessaryCans(walls);
  if (result.err) {
    const { err, status } = result;
    return res.status(status).json(err);
  }
  return res.status(200).json(result);
};

module.exports = {
  getNecessaryCans,
};
