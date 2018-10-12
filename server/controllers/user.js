const User = require('../models/user'),
  helper = require('../helpers/helper'),
  emails = require('../emails/email'),
  jwt = require('jsonwebtoken'),
  https = require('https');
const { OAuth2Client } = require('google-auth-library');

const getToken = (user) => {
  const userDetails = {
    email: user.email,
    id: user._id,
    role: user.role,
    firstName: user.firstName,
    status: user.status,
    location: user.loc,
    profilePhoto: user.profilePhoto,
  };
  const jsonToken = helper.createToken({ userDetails }, '24h');
  return jsonToken;
};

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
      user.save((err) => {
        if (err) {
          return res.status(500).send({ err });
        }
        const siteUrl = `${req.protocol}://${req.get('host')}`;
        const link = `${siteUrl}/email/verify/${registrationToken}`;
        emails.sendVerificationMail(req.body.email, link);
        return res.status(200)
          .send({ message: 'Please check your email to continue' });
      });
    } else {
      return res.status(409)
        .send({ message: 'email already exists' });
    }
  });
};

exports.updateOrCreateSocialUser = (req, res) => {
  const provider = req.body.provider;

  /**
   * @returns {response} response object
   * @param {any} CLIENT_ID
   */
  async function verify(CLIENT_ID) {
    const client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: req.body.token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (CLIENT_ID === payload.azp) {
      req.body.email = payload.email;
      req.body.photos = [payload.picture];
      req.body.firstName = payload.given_name;
      req.body.lastName = payload.family_name;
      req.body.profilePhoto = payload.picture;
    } else {
      throw new Error('app id do not match');
    }
  }

  const checkDetails = () => User.findOne({
    email: req.body.email,
  }).then((existingUser) => {
    if (!existingUser) {
      const user = new User({
        email: req.body.email,
        photos: req.body.photos,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profilePhoto: req.body.profilePhoto,
        loc: req.body.loc,
        status: 'verified'
      });
      return user.save((err) => {
        if (err) {
          return res.status(500).send({ err });
        }
        const jsonToken = getToken(user);
        user.saveLastLogin();
        return res.status(200).send({ message: 'login successful', jsonToken });
      });
    }
    if (
      !existingUser.profilePhoto ||
      !existingUser.firstName ||
      !existingUser.lastName ||
      !existingUser.photos.length
    ) {
      existingUser.profilePhoto = existingUser.profilePhoto ||
        req.body.profilePhoto;
      existingUser.status = 'verified';
      existingUser.firstName = existingUser.firstName || req.body.firstName;
      existingUser.lastName = existingUser.lastName || req.body.lastName;
      existingUser.photos =
        existingUser.photos.length ? existingUser.photos : req.body.photos;
      return existingUser.save((err, updatedUser) => {
        if (err) {
          return res.status(500).send({ err });
        }
        const jsonToken = getToken(updatedUser);
        existingUser.saveLastLogin();
        return res.status(200).send({ message: 'login successful', jsonToken });
      });
    }
    const jsonToken = getToken(existingUser);
    existingUser.saveLastLogin();
    return res.status(200).send({ message: 'login successful', jsonToken });
  });

  if (provider === 'google') {
    verify(process.env.GOOGLE_CLIENT_ID)
      .then(() => checkDetails())
      .catch(() => res.status(400).send({ message: 'Error logging in' }));
  } else if (provider === 'facebook') {
    const token = req.body.token;
    https.get(
      `https://graph.facebook.com/debug_token?input_token=${
      token}&access_token=${process.env.FACEBOOK_TOKEN}`,
      (res) => {
        res.setEncoding('utf8');
        res.on('data',
          (d) => {
            const isValid = JSON.parse(d).data.is_valid;
            if (isValid) {
              checkDetails();
            } else {
              return res.status(400).send({ message: 'Invalid auth token' });
            }
          });
      }).on('error',
        () => res.status(400).send({ message: 'Error logging in' }));
  }
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
      const siteUrl = `${req.protocol}://${req.get('host')}`;
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
      const userDetails = {
        email: updateduser.email,
        here_to: updateduser.here_to,
        firstName: user.firstName,
        id: updateduser._id,
        status: updateduser.status,
        location: updateduser.loc,
        profilePhoto: updateduser.profilePhoto,
      };
      const jsonToken = helper.createToken({ userDetails }, '24h');
      return res.status(200)
        .send({ message: 'Email verified successfully', jsonToken });
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
    if (!user.password) {
      return res.status(400)
        .send({ message: 'incorrect password' });
    }
    if (!user.comparePassword(req.body.password)) {
      return res.status(400)
        .send({ message: 'email or password is incorrect' });
    }
    const userDetails = {
      email: user.email,
      id: user._id,
      here_to: user.here_to,
      firstName: user.firstName,
      status: user.status,
      location: user.loc,
      profilePhoto: user.profilePhoto,
    };
    const jsonToken = helper.createToken({ userDetails }, '24h');
    user.saveLastLogin();
    return res.status(200).send({ message: 'login successful', jsonToken });
  });
};

exports.update = (req, res) => {
  User.findOneAndUpdate({ email: req.user.email },
    { $set: req.body }, { new: true }, (err, updatedUser) => {
      if (!updatedUser) {
        return res.status(400).send({ message: 'An error occurred' });
      }
      const userDetails = {
        email: updatedUser.email,
        id: updatedUser._id,
        here_to: updatedUser.here_to,
        firstName: updatedUser.firstName,
        status: updatedUser.status,
        location: updatedUser.loc,
        profilePhoto: updatedUser.profilePhoto,
      };
      const jsonToken = helper.createToken({ userDetails }, '24h');
      updatedUser.saveLastLogin();
      return res.status(200).send({ message: 'success', jsonToken });
    });
};

exports.updatePhoto = (req, res) => {
  if (!req.body.fileUrl) {
    res.status(400)
      .send({ message: 'Image url is required' });
  }
  User.findOne({
    email: req.user.email,
  }).then((user) => {
    if (!user) {
      res.status(404)
        .send({ message: 'User not found' });
    } else {
      user.photos.push(req.body.fileUrl);
      user.save((err, updatedUser) => {
        if (err) {
          return res.status(500).send({ err });
        }
        return res.status(200)
          .send({ message: 'Success', updatedUser });
      });
    }
  }).catch((err) => {
    if (err) return res.status(500).send({ err });
  });
};

exports.deletePhoto = (req, res) => {
  const fileurl = req.query.q;
  User.findOne({
    email: req.user.email,
  }).then((user) => {
    if (!user) {
      res.status(404)
        .send({ message: 'User not found' });
    } else {
      const index = user.photos.indexOf(fileurl);
      if (index > -1) {
        user.photos.splice(index, 1);
      }
      user.save((err, updatedUser) => {
        if (err) {
          return res.status(500).send({ err });
        }
        return res.status(200)
          .send({ message: 'Success', updatedUser });
      });
    }
  }).catch((err) => {
    if (err) return res.status(500).send({ err });
  });
};

exports.getOne = (req, res) => {
  let query;
  if (req.params.id !== 'me') {
    query = { _id: req.params.id };
  } else {
    query = { email: req.user.email };
  }
  User
    .findOne(query)
    .populate('reviews')
    .exec((err, user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      if (err) return res.status(500).send({ err });
      return res.status(200).send({ message: 'success', user });
    });
};

exports.getAll = (req, res) => {
  const long = parseFloat(req.query.long);
  const lat = parseFloat(req.query.lat);
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const offset = (limit * page) - limit;
  let geoNear;
  if (req.query.maxDistance) {
    geoNear = {
      $and: [
        { sex: req.query.sex },
        { here_to: req.query.here_to },
        { age: { $lte: req.query.maxAge } },
        {
          loc: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [long, lat]
              },
              $maxDistance: 10000
            }
          }
        }
      ],
    };
  } else {
    geoNear = {
      loc: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [long, lat]
          },
          $maxDistance: 10000
        }
      }
    };
  }
  User
    .find(geoNear)
    .skip(offset)
    .limit(limit)
    .exec((err, users) => {
      if (err) {
        return res.status(400).send({ message: 'An error occured', err });
      }
      if (!users.length) {
        return res.status(404).send({ message: 'No user found' });
      }
      User.count(geoNear).exec((err, count) => {
        if (!count) {
          return res.status(400).send({ message: 'An error occured' });
        }
        if (err) return res.status(500).send({ err });
        return res.status(200).send({
          users,
          pagination: {
            count,
            currentPage: page,
            pages: Math.ceil(count / limit),
            pageSize: (count - offset) > limit ? limit : (count - offset)
          }
        });
      });
    });
};

