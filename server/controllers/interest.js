const Events = require('../models/events');
const Interest = require('../models/interests');

exports.showInterest = (req, res) => {
  Events.findOne({
    _id: req.params.id,
    created_by_id: { $ne: req.user.id }
  }).then((event) => {
    Interest.findOne({
      interestedUser: req.user.id,
      event: req.params.id,
    }).then((existingInterest) => {
      if (existingInterest) {
        return res.status(400)
          .send({
            message: 'You have already signified interest for this event'
          });
      }
      const newInterest = {
        interestedUser: req.user.id,
        event: req.params.id,
        eventOwner: event.created_by
      };
      const interest = new Interest(newInterest);
      interest.save((err, updatedInterest) => {
        if (err) {
          return res.status(500).send({ err });
        }
        global.io.sockets.emit('user_interested', {
          user: req.user.email,
          owner: event.created_by_id
        });
        event.interested.push(req.user.id);
        event.save((err, updatedEvent) => {
          if (err) {
            return res.status(500).send({ err });
          }
        });
        return res.status(200)
          .send({ message: 'Success', updatedInterest });
      });
    }).catch((err) => {
      if (err) return res.status(500).send({ err });
    });
  }).catch((err) => {
    if (err) return res.status(500).send({ err });
  });
};

exports.getEventInterest = (req, res) => {
  Interest
    .find({ event: req.params.id, })
    .sort({ created_at: -1 })
    .populate('interestedUser')
    .exec((err, interestedUsers) => {
      if (err) return res.status(500).send({ err });
      if (!interestedUsers.length) {
        return res.status(404).send({ message: 'No interest found' });
      }
      return res.status(200).send({
        message: 'success',
        interestedUsers
      });
    });
};

exports.getMyInterests = (req, res) => {
  Interest
    .find({ interestedUser: req.user.id })
    .sort({ created_at: -1 })
    .exec((err, myInterests) => {
      if (err) return res.status(500).send({ err });
      if (!myInterests.length) {
        return res.status(404).send({ message: 'No interest found' });
      }
      return res.status(200).send({
        message: 'success',
        myInterests
      });
    });
};
