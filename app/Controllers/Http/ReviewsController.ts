/*
Author: Max Martin
2022 April 9
This class contains the logic for getting and submitting reviews
*/

// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const mongoose = require("mongoose");
const Review = mongoose.model("Review");
const CoffeeBean = mongoose.model("CoffeeBean");
const User = mongoose.model("User");

export default class ReviewsController {
  public async getAll({ request, response }) {
    const coffeeBeanId = request.qs().id;
    if (!coffeeBeanId)
      return response.notFound({ error: "Coffee bean does not exist" });
    const reviews = await Review.find({ coffeeBeanId });
    const cleanReviews: Object[] = [];

    for (let i = 0; i < reviews.length; i++) {
      const user = await User.findOne({ userId: reviews[i].userId });
      const review = {
        coffeeBeanId: reviews[i].coffeeBeanId,
        userId: reviews[i].userId,
        rating: reviews[i].rating,
        comment: reviews[i].comment,
        createdAt: reviews[i].createdAt,
        updatedAt: reviews[i].updatedAt,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      };
      cleanReviews.push(review);
    }

    return cleanReviews;
  }

  public async create({ request, response }) {
    const { coffeeBeanId, rating, comment } = request.body();
    const userId = request["user"].userId;
    if (!coffeeBeanId || !rating)
      return response.notFound({ error: "Coffee bean does not exist" });
    const coffeeBean = await CoffeeBean.findOne({ coffeeBeanId });
    if (!coffeeBean)
      return response.notFound({ error: "Coffee bean does not exist" });
    const existingReview = await Review.findOne({
      coffeeBeanId,
      userId,
    });

    if (existingReview)
      return response.conflict({
        error: "You already reviewed this coffee bean.",
      });

    const review = await Review.create({
      coffeeBeanId,
      userId,
      rating,
      comment: comment ?? "",
    });

    const cleanReview = {
      coffeeBeanId: review.coffeeBeanId,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      user: {
        userId: review.userId,
      },
    };

    const user = await User.findOne({ userId });
    cleanReview.user["firstName"] = user.firstName;
    cleanReview.user["lastName"] = user.lastName;

    return response.created(cleanReview);
  }
}
