const http = require('http');
const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const socket = require('socket.io');

const config = require('../config');

const myIo = require('./sockets/io');
const routes = require('./routes/routes');

const app = express();
const server = http.Server(app);
const io = socket(server);

server.listen(config.port);

games = {};

myIo(io);

console.log(`Server listening on port ${config.port}`);

const Handlebars = handlebars.create({
  extname: '.html',
  partialsDir: path.join(__dirname, '..', 'front', 'views', 'partials'),
  defaultLayout: false,
  helpers: {},
});
app.engine('html', Handlebars.engine);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '..', 'front', 'views'));
app.use(
  '/public',
  express.static(path.join(__dirname, '..', 'front', 'public'))
);

routes(app);
