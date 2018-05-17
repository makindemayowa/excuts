const User = require('../models/user'),
  helper = require('../helpers/helper'),
  emails = require('../emails/email'),
  jwt = require('jsonwebtoken');

exports.create = (req, res) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const registrationToken = helper.createToken({ rand: helper.rand }, '24h');
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({
      message: 'Email is not rightly formatted'
    });
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ message: 'Password doesn\'t match' });
  }
  User.findOne({
    email: req.body.email
  }).then((existingUser) => {
    if (!existingUser) {
      req.body.status = 'pending';
      req.body.verifyingToken = registrationToken;
      const user = new User(req.body);
      user.save((err, res) => {
        if (err) {
          return res.status(500).send({ err });
        }
        const siteUrl = `${req.protocol} + "://" + ${req.get('host')}`;
        const link = `${siteUrl}/api/signup/verify/${registrationToken}`;
        emails.sendVerificationMail(req.body.email, link);
      });
    }
    return res.status(200)
      .send({ message: 'Please check your email to continue' });
  });
};

exports.forgotPasswordMail = (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: 'Please input Email' });
  }
  User.findOne({
    email: req.body.email
  }, (err, foundUser) => {
    if (err) return res.status(500).send({ err });
    if (!foundUser) {
      return res.status(400).send({ message: 'User record not found' });
    }
    const userDetails = {
      email: foundUser.email,
      id: foundUser.password,
    };
    const token = helper.createToken({ userDetails }, '2h');
    foundUser.passwordResetToken = token;
    foundUser.save((err) => {
      if (err) {
        return res.status(500).send({ err });
      }
      const siteUrl = `${req.protocol} + "://" + ${req.get('host')}`;
      const link = `${siteUrl}/reset-password/verify?t=${token}`;
      emails.sendPasswordRecoveryMail(foundUser.email, link);
      return res.status(200).send({ success: true, token });
    });
  });
};

exports.resetForgottenPassword = (req, res) => {
  const passwordResetToken = req.body.token;
  jwt.verify(passwordResetToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(400).send({ message: 'Invalid Auth Token', err });
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    User.findOne({ email: decoded.userDetails.email }, (err, user) => {
      if (err || !user) {
        return res.status(404).send({ message: 'User not found', err });
      }
      user.password = req.body.password;
      user.passwordResetToken = '';
      user.save((err, updatedUser) => {
        if (err) {
          return res.status(500).send({ err });
        }
        return res.status(200)
          .send({ message: 'reset password request successful', updatedUser });
      });
    });
  });
};

exports.verifyToken = (req, res) => {
  User.findOne({
    verifyingToken: req.params.token
  }, (err, user) => {
    if (err) return res.status(500).send({ err });
    if (!user) return res.status(400).send({ message: 'Invalid Auth Token' });

    user.status = 'verified';
    user.verifyingToken = '';
    user.save((err, updateduser) => {
      if (err) return res.status(500).send({ err });
      return res.status(200)
        .send({ message: 'Email verified successfully', updateduser });
    });
  });
};

exports.login = (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) return res.status(500).send({ err });
    if (!user) {
      return res.status(404)
        .send({ message: 'email or password is incorrect' });
    }
    if (!user.comparePassword(req.body.password)) {
      return res.status(400)
        .send({ message: 'email or password is incorrect' });
    }
    const userDetails = {
      email: user.email,
      id: user._id,
      isAdmin: user.isMerchant,
    };
    const jsonToken = helper.createToken({ userDetails }, '24h');
    return res.status(200).send({ message: 'login successful', jsonToken });
  });
};

exports.update = (req, res) => {
  User.findOneAndUpdate({ email: req.user.email },
    { $set: req.body }, { new: true }, (err, response) => {
      if (!response) {
        return res.status(400).send({ message: 'An error occurred' });
      }
      if (err) return res.status(500).send({ err });
      return res.status(200).send({ message: 'success', response });
    });
};

exports.getOne = (req, res) => {
  User.findOne({ _id: req.params.id },
    (err, user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      if (err) return res.status(500).send({ err });
      return res.status(200).send({ message: 'success', user });
    });
};