import mongoose from "mongoose";
const { Schema } = mongoose;

const coffeeBeanSchema = new Schema({
  coffeeBeanId: String,
  shopId: String,
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
  },
  specie: {
    type: String,
    default: "",
    required: true,
    enum: ["Arabica", "Robusta", "Liberica"],
  },
  origin: {
    type: String,
    default: "",
    trim: true,
    required: true,
  },
  roastingLevel: {
    type: String,
    default: "",
    trim: true,
  },
  price: {
    type: Number,
  },
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
