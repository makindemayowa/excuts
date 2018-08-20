const Events = require('../models/events');

exports.create = (req, res) => {
  req.body.title = req.body.title.toLowerCase();
  Events.findOne({
    title: req.body.title,
    created_by: req.user.id
  }).then((existingEvent) => {
    if (!existingEvent) {
      req.body.created_by = req.user.email;
      req.body.created_by_id = req.user.id;
      req.body.imgUrl = req.user.profilePhoto;
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
    created_by_id: req.user.id,
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
    {
      $set: {
        // 'review.review': req.body.review,
        // 'review.reviewer': req.user.id
      }
    }, { new: true }, (err, response) => {
      if (!response) {
        return res.status(400).send({ message: 'An error occurred' });
      }
      if (err) return res.status(500).send({ err });
      return res.status(200).send({ message: 'success', response });
    });
};

exports.interested = (req, res) => {
  Events.findOne({
    _id: req.params.id,
    created_by_id: { $ne: req.user.id }
  }).then((event) => {
    if (!event) {
      res.status(404)
        .send({ message: 'Event not found' });
    } else {
      const index = event.interested.findIndex(
        interested => interested._id == req.user.id
      );
      if (index !== -1) {
        return res.status(400)
          .send({
            message: 'You have already signified interest for this event'
          });
      }
      event.interested.push(req.user.id);
      event.save((err, updatedInterest) => {
        if (err) {
          return res.status(500).send({ err });
        }
        global.io.sockets.emit('user_interested', {
          user: req.user.email,
          owner: event.created_by._id
        });
        return res.status(200)
          .send({ message: 'Success', updatedInterest });
      });
    }
  }).catch((err) => {
    if (err) return res.status(500).send({ err });
  });
};

exports.getOne = (req, res) => {
  Events
    .findOne({ _id: req.params.id })
    .populate('interested', 'firstName')
    .exec((err, event) => {
      if (!event) {
        return res.status(404).send({ message: 'Event not found' });
      }
      if (err) return res.status(500).send({ err });
      return res.status(200).send({ message: 'success', event });
    });
};

exports.getAll = (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const offset = (limit * page) - limit;
  let query;
  if (req.query.q === 'mine') {
    query = {
      created_by: req.user.email
    };
  } else if (req.query.page) {
    query = {};
  } else {
    if (Object.keys(req.query).length) {
      query = {
        interestedIn: req.query.sex,
        state: req.query.state.toLowerCase(),
        date: { $gte: req.query.startDate }
      };
    } else {
      const today = new Date();
      const yesterday = new Date(today);
      // const sevenDaysAgo = new Date(new Date() - (7 * 60 * 60 * 24 * 1000));
      query = {
        // date: { $gte: yesterday.setDate(today.getDate() - 3) },
      };
    }
  }
  Events
    .find(query)
    .skip(offset)
    .limit(limit)
    .sort({
      date: -1,
    })
    .exec((err, events) => {
      if (!events) {
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
  Events.findOneAndUpdate({ _id: req.params.id, created_by_id: req.user.id, },
    { $set: { status: 'archived' } }, { new: true }, (err, response) => {
      if (!response) {
        return res.status(404).send({ message: 'Event not found' });
      }
      if (err) return res.status(500).send({ err });
      return res.status(200)
        .send({ message: 'Event deleted sucessfully', response });
    });
};
