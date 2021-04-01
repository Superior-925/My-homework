/*
1. $ npm init -y
2. $ npm install express --save
3. $ npm install --save-dev nodemon
4. $ npm i connect-timeout cors
5. Create index.js
6. update package.json with start scripts
7. $ npm run start:dev
8. $ sudo subl /etc/hosts
    - add 127.0.0.1 devdemo
    - save
9. open browser & navigate to http://devdemo:3333
10. curl http://devdemo:3333/todos
11. postman
*/

//global modules
const express = require('express');
const cors = require('cors');
//const timeout = require('connect-timeout'); //to use as "top-level" middleware -> not recommended!!!

//local modules
const config = require('./config.json')[process.env.NODE_ENV];
const route = require('./route');

//init app
const app = express();

//top level middlewares
app.use(cors());

app.use('/', route);

//The 404 Route (ALWAYS Keep this as the last route)
app.use(function(req, res) {
  res.status(404).send('PAGE NOT FOUND!');
});

app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`);
});


