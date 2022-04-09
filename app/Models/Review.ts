import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema({
  coffeeBeanId: String,
  userId: String,
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("Review", reviewSchema);
