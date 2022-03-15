import mongoose from "mongoose";
const { Schema } = mongoose;

const coffeeBeanSchema = new Schema({
  coffeeBeanId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("CoffeeBean", coffeeBeanSchema);
