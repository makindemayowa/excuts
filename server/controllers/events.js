const Event = require('../models/events');

exports.create = (req, res) => {
  Event.findOne({
    title: req.body.title,
    created_by: req.user._id
  }).then((existingEvent) => {
    if (!existingEvent) {
      const event = new Event(req.body);
      event.save((err, newEvent) => {
        if (err) {
          return res.status(500).send({ err });
        }
        return res.status(200)
          .send({ message: 'Success', newEvent });
      });
    }
    return res.status(409)
      .send({ message: 'You have an event with this title' });
  });
};

exports.update = (req, res) => {
  Event.findOneAndUpdate({
    created_by: req.user._id,
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

exports.getOne = (req, res) => {
  Event.findOne({ _id: req.params.id },
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
    created_by: { $ne: req.user._id },
    date: { $gte: new Date('2018-05-05') },
  };
  Event
    .aggregate(query)
    .skip(offset)
    .limit(limit)
    .exec((err, events) => {
      if (!events.length) {
        return res.status(404).send({ message: 'No user found' });
      }
      Event.aggregate(query).exec((err, response) => {
        const count = response[0].total;
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
  Event.findOneAndUpdate({ _id: req.params.id, created_by: req.user._id, },
    { $set: { status: 'archived' } }, { new: true }, (err, response) => {
      if (!response) {
        return res.status(404).send({ message: 'Event not found' });
      }
      if (err) return res.status(500).send({ err });
      return res.status(200)
        .send({ message: 'Event deleted sucessfully', response });
    });
};
