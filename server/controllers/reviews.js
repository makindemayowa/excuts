const Review = require('../models/reviews');
const User = require('../models/user');

exports.create = (req, res) => {
  if (!req.body.review) {
    res.status(400)
      .send({ message: 'Review cannot be empty' });
  }
  User.findOne({
    _id: req.params.id
  }).then((user) => {
    if (!user) {
      res.status(404)
        .send({ message: 'User not found' });
    } else {
      const reviewBody = {
        reviewer: req.user.id,
        review: req.body.review,
        reviewee: user.email,
        reviewersName: req.user.firstName || ''
      };
      const review = new Review(reviewBody);
      review.save((err, newReview) => {
        if (err) {
          return res.status(500).send({ err });
        }
        user.reviews.push(newReview._id);
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
