import mongoose from "mongoose";
const { Schema } = mongoose;

const shopSchema = new Schema({
  shopId: String,
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  image: String,
  location:{
    lat: Number,
    lng: Number,
  },
  userId: String,
  status: {
    type: Number,
    default: 1,
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
shopSchema.index({ location: "2dsphere" });

mongoose.model("Shop", shopSchema);
