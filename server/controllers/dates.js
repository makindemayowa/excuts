const Date = require('../models/dates');
const User = require('../models/user');

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
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
      };
      const date = new Date(dateBody);
      date.save((err, newDate) => {
        if (err) {
          return res.status(500).send({ err });
        }
        user.dateRequests.push(newDate._id);
        user.save((err, updatedUser) => {
          if (err) {
            return res.status(500).send({ err });
          }
          return res.status(200)
            .send({ message: 'Success', updatedUser });
        });
      });
    }
  }).catch((err) => {
    if (err) return res.status(500).send({ err });
  });
};
