require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const ExampleService = require('./example/example-service');

const app = express();
const jsonParser = express.json();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get('/lists', (req,res) => {
  const db = req.app.get('db');
  ExampleService.getAllLists(db)
    .then(lists => {
      return res.status(200).json(lists);
    });
});

app.post('/lists', jsonParser, (req,res) => {
  const db = req.app.get('db');
  const { title, items } = req.body;

  if(!title) {
    return res.status(400).json({error: 'Title is required'});
  }
  if(!items) {
    return res.status(400).json({error: 'Items are required'});
  }

  const newList = { title, items }; 

  ExampleService.postList(db, newList)
    .then(list => {
      return res
        .status(201)
        .json(list);
    });
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;