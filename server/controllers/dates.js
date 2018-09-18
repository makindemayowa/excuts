const DateOut = require('../models/dates');
const User = require('../models/user');
const emails = require('../emails/email');

exports.create = (req, res) => {
  if (!req.body.description) {
    res.status(400)
      .send({ message: 'description cannot be empty' });
  }
  User.findOne({
    _id: req.params.id
  }).then((user) => {
    if (!user) {
      res.status(404)
        .send({ message: 'User not found' });
    } else {
      const dateBody = {
        requester: req.user.id,
        requested: req.params.id,
        description: req.body.description,
        date: req.body.date,
        venue: req.body.venue,
        status: 'pending',
      };
      const date = new DateOut(dateBody);
      date.save((err, newDate) => {
        if (err) {
          return res.status(500).send({ err });
        }
        user.dateRequests.push(newDate._id);
        user.save((err, updatedUser) => {
          if (err) {
            return res.status(500).send({ err });
          }
          emails.sendNewDateRequestMail(user.email, date.venue);
          return res.status(200)
            .send({ message: 'Success', updatedUser });
        });
      });
    }
  }).catch((err) => {
    if (err) return res.status(500).send({ err });
  });
};

exports.getAllDates = (req, res) => {
  let query;
  if (req.query.q) {
    query = {
      requested: req.user.id,
      status: req.query.q
    };
  } else {
    query = { requested: req.user.id };
  }
  DateOut
    .find(query)
    .sort({ created_at: -1 })
    .populate('requester', 'firstName')
    .exec((err, dateRequests) => {
      if (err) return res.status(500).send({ err });
      if (!dateRequests.length) {
        return res.status(404).send({ message: 'No dateRequests found' });
      }
      return res.status(200).send({
        message: 'success',
        dateRequests
      });
    });
};

exports.getMyDates = (req, res) => {
  DateOut
    .find({ requester: req.user.id })
    .sort({ created_at: -1 })
    .populate('requested', 'firstName')
    .exec((err, dateRequests) => {
      if (err) return res.status(500).send({ err });
      if (!dateRequests.length) {
        return res.status(404).send({ message: 'No dateRequests found' });
      }
      return res.status(200).send({
        message: 'success',
        dateRequests
      });
    });
};

exports.update = (req, res) => {
  DateOut.findOneAndUpdate({ _id: req.params.id },
    { $set: req.body }, { new: true }, (err, updatedDate) => {
      if (!updatedDate) {
        return res.status(400).send({ message: 'An error occurred', err });
      }
      User.findOne({
        _id: updatedDate.requester
      }).then((requester) => {
        emails.sendNewDateStatusMail(
          requester.email, updatedDate.venue, updatedDate.status);
        return res.status(200).send({ message: 'success', updatedDate });
      })
      .catch(() => res.status(400).send({ message: 'An error occurred', err }));
    });
};
