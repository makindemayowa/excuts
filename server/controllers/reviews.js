const Review = require('../models/reviews');
const Events = require('../models/events');

exports.create = (req, res) => {
  if (!req.body.review) {
    res.status(400)
      .send({ message: 'Review cannot be empty' });
  }
  Events.findOne({
    _id: req.params.id,
    created_by: { $ne: req.user.id }
  }).then((event) => {
    if (!event) {
      res.status(404)
        .send({ message: 'Event not found' });
    } else {
      const reviewBody = {
        reviewer: req.user.id,
        review: req.body.review,
        reviewee: event.created_by,
        event: event._id,
        reviewersName: req.user.fullName || '',
      };
      const review = new Review(reviewBody);
      review.save((err, newReview) => {
        if (err) {
          return res.status(500).send({ err });
        }
        event.reviews.push(newReview);
        event.save((err, updatedEvent) => {
          if (err) {
            return res.status(500).send({ err });
          }
          return res.status(200)
            .send({ message: 'Success', updatedEvent });
        });
      });
    }
  }).catch((err) => {
    if (err) return res.status(500).send({ err });
  });
};
