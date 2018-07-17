const user = require('../controllers/user');
const event = require('../controllers/events');
const review = require('../controllers/reviews');
const interest = require('../controllers/interest');
const date = require('../controllers/dates');
const Validator = require('express-joi-validation');
const dataValidators = require('../helpers/validator');
const auth = require('../middlewares/authorisation');

const validator = Validator({});

module.exports = (app) => {
  app.post('/api/signup',
    validator.body(dataValidators.createUser),
    user.create
  );
  app.get('/api/signup/verify/:token',
    user.verifyToken
  );
  app.post('/api/login',
    validator.body(dataValidators.userLogin),
    user.login
  );
  app.post('/api/reset-password',
    user.forgotPasswordMail
  );
  app.post('/api/reset-password/update',
    user.resetForgottenPassword
  );
  app.put('/api/user',
    auth.checkToken,
    user.update
  );
  app.put('/api/user/photo',
    auth.checkToken,
    user.updatePhoto
  );
  app.delete('/api/user/photo',
    auth.checkToken,
    user.deletePhoto
  );
  app.get('/api/user/:id',
    auth.checkToken,
    user.getOne
  );
  app.get('/api/user',
    auth.checkToken,
    user.getAll
  );
  app.post('/api/event',
    auth.checkToken,
    validator.body(dataValidators.createEvent),
    event.create
  );
  app.get('/api/event/:id',
    auth.checkToken,
    event.getOne
  );
  app.get('/api/event',
    auth.checkToken,
    event.getAll
  );
  app.put('/api/event',
    auth.checkToken,
    event.update
  );
  app.delete('/api/event',
    auth.checkToken,
    event.delete
  );
  app.post('/api/user/:id/review',
    auth.checkToken,
    review.create
  );
  app.post('/api/user/:id/requestdate',
    auth.checkToken,
    date.create
  );
  app.get('/api/daterequests',
    auth.checkToken,
    date.getAllDates
  );
  app.get('/api/mydaterequests',
    auth.checkToken,
    date.getMyDates
  );
  app.put('/api/daterequests/:id',
    auth.checkToken,
    date.update
  );
  app.put('/api/event/:id/interested',
    auth.checkToken,
    interest.showInterest
  );
  app.get('/api/event/:id/interested',
    auth.checkToken,
    interest.getEventInterest
  );
  app.get('/api/user/:id/interested',
    auth.checkToken,
    interest.getMyInterests
  );
};
