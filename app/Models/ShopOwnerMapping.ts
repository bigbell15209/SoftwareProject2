import mongoose from "mongoose";
const { Schema } = mongoose;

const shopOwnerMappingSchema = new Schema({
  shopId: String,
  userId: String
});

mongoose.model("ShopOwnerMapping", shopOwnerMappingSchema);
