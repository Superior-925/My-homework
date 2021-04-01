//global modules
const express = require('express');
const timeout = require('connect-timeout');
const fileStorage = require('fs');
const bodyParser = require('body-parser');

const router = express.Router();

router.get('/health', timeout('5s'), (req, res) => {
  //res.status(200); // 503 - timeout
  res.status(200).end();
});

router.get('/todos', (req, res) => {
  const todos = require('./data/todos.json');
  res.json(todos);
});

module.exports = router;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/todos', function(req, res) {
  fileStorage.readFile('./data/todos.json', function read(err, data) {
    if (err) {
      throw err;
    }
    let content = data;
    content = JSON.parse(content);
    console.log(content);
    content.push(req.body);
    console.log(content);
    fileStorage.unlink('./data/todos.json', function(err) {
        if (err) {
          return console.error(err);
        }});
    let jsonContent = JSON.stringify(content);
    fileStorage.writeFile('./data/todos.json', jsonContent,  function(err) {
      if (err) {
        return console.error(err);
      }});
  });

});

router.delete('/todos', function(req, res) {
  fileStorage.writeFile('./data/todos.json', "[]",  function(err) {
    if (err) {
      return console.error(err);
    }});
});

router.post('/changeIsDone', function(req, res) {

  console.log(req.body);

});