require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const { celebrate, Joi, errors } = require('celebrate');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('все работает');
});
