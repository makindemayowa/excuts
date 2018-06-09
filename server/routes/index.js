const user = require('../controllers/user');
const event = require('../controllers/events');
const review = require('../controllers/reviews');
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
  app.get('/api/user',
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
  app.post('/api/event/:id/review',
    auth.checkToken,
    review.create
  );
  app.put('/api/event/:id/interested',
    auth.checkToken,
    event.interested
  );
};
