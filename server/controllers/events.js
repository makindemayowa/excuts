const Events = require('../models/events');

exports.create = (req, res) => {
  Events.findOne({
    title: req.body.title,
    created_by: req.user.id
  }).then((existingEvent) => {
    if (!existingEvent) {
      req.body.created_by = req.user.id;
      const event = new Events(req.body);
      event.save((err, newEvent) => {
        if (err) {
          return res.status(500).send({ err });
        }
        return res.status(200)
          .send({ message: 'Success', newEvent });
      });
    } else {
      return res.status(409)
        .send({ message: 'You have an event with this title' });
    }
  }).catch((err) => {
    if (err) return res.status(500).send({ err });
  });
};

exports.update = (req, res) => {
  Events.findOneAndUpdate({
    created_by: req.user.id,
    _id: req.params.id
  },
    { $set: req.body }, { new: true }, (err, response) => {
      if (!response) {
        return res.status(400).send({ message: 'An error occurred' });
      }
      if (err) return res.status(500).send({ err });
      return res.status(200).send({ message: 'success', response });
    });
};

exports.updateReview = (req, res) => {
  Events.findOneAndUpdate({
    _id: req.params.id
  },
    { $set: {
      review: req.body.review,
      reviewer: req.user._id
    } }, { new: true }, (err, response) => {
      if (!response) {
        return res.status(400).send({ message: 'An error occurred' });
      }
      if (err) return res.status(500).send({ err });
      return res.status(200).send({ message: 'success', response });
    });
};

// exports.deleteReview = (req, res) => {
//   Events.findOne(
//     { _id: req.params.id, reviewer: req.user._id, }, (err, review) => {
//       if (!review) {
//         return res.status(404).send({ message: 'review not found' });
//       }
//       if (err) return res.status(500).send({ err });
//       if (review) {
//         Review.remove({ _id: req.params.id },
//           () => res.status(204).send({ message: 'success' }));
//       }
//     });
// };

exports.getOne = (req, res) => {
  Events.findOne({ _id: req.params.id },
    (err, event) => {
      if (!event) {
        return res.status(404).send({ message: 'Event not found' });
      }
      if (err) return res.status(500).send({ err });
      return res.status(200).send({ message: 'success', event });
    });
};

exports.getAll = (req, res) => {
  const limit = req.query.limit || 5;
  const page = req.query.page || 1;
  const offset = (limit * page) - limit;
  const query = {
    created_by: { $ne: req.user.id },
    // date: { $gte: new Date('2018-05-05') },
  };
  Events
    .find(query)
    .skip(offset)
    .limit(limit)
    .sort({ created_at: -1 })
    .populate('created_by')
    .exec((err, events) => {
      if (!events.length) {
        return res.status(404).send({ message: 'No event found' });
      }
      Events.count(query).exec((err, count) => {
        if (err) return res.status(500).send({ err });
        return res.status(200).send({
          events,
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

exports.delete = (req, res) => {
  Events.findOneAndUpdate({ _id: req.params.id, created_by: req.user.id, },
    { $set: { status: 'archived' } }, { new: true }, (err, response) => {
      if (!response) {
        return res.status(404).send({ message: 'Event not found' });
      }
      if (err) return res.status(500).send({ err });
      return res.status(200)
        .send({ message: 'Event deleted sucessfully', response });
    });
};
