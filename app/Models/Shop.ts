import mongoose from "mongoose";
const { Schema } = mongoose;

const shopSchema = new Schema({
  shopId: String,
  name: String,
  description: String,
  address: String,
  image: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  deliveryRange: Number,
  status: Number,
});

mongoose.model("Shop", shopSchema);
