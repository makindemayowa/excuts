const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./server/routes/index');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`app is listening on port ${port}!`);
});

const dbURL = process.env.NODE_ENV === 'test' ?
  process.env.MONGOHQ_TEST_URL : process.env.MONGOHQ_URL;

mongoose.connect(dbURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

userRoutes(app);

// app.use(express.static('./client/build'));

app.all('*', (req, res) => {
  res.status(404).send({ message: 'route not found' });
});

module.exports = app;
