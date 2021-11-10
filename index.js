require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const paintingController = require('./controllers/paintingController');

const app = express();

app.use(bodyParser.json());

app.get('/cans', paintingController.getNecessaryCans);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
