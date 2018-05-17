const user = require('../controllers/user');
const Validator = require('express-joi-validation');
const dataValidators = require('../helpers/validator');
const auth = require('../middlewares/authorisation');

const validator = Validator({});

module.exports = (app) => {
  app.post('/api/signup',
    validator.body(dataValidators.createUser),
    user.create);
  app.get('/api/signup/verify/:token', user.verifyToken);
  app.post('/api/login',
    validator.body(dataValidators.userLogin),
    user.login);
  app.post('/api/reset-password', user.forgotPasswordMail);
  app.post('/api/reset-password/update', user.resetForgottenPassword);
  app.put('/api/user', auth.checkToken, user.update);
  app.get('/api/user/:id', auth.checkToken, user.getOne);
};
