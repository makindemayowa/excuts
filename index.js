const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./server/routes/index');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

const serverconnection = app.listen(port, () => {
  console.log(`app is listening on port ${port}!`);
});

const dbURL = process.env.NODE_ENV === 'test' ?
  process.env.MONGOHQ_TEST_URL : process.env.MONGOHQ_URL;

mongoose.connect(dbURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const io = require('socket.io')(serverconnection);

global.io = io;
io.on('connection', (socket) => {
  console.log(`this user ${socket.id} is connected`);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(express.static(path.join(__dirname, 'client/build')));

routes(app);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'client/build/index.html'))
);

module.exports = app;
