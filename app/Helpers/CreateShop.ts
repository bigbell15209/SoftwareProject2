const mongoose = require("mongoose");
const Shop = mongoose.model("Shop");
import { v4 as uuid } from "uuid";

export default async function createShop(ownerId: string, shop: any) {
  const { name, description, address, image, location, deliveryRange } = shop;
  try {
    const newShop = await Shop.create({
      shopId: uuid(),
      name,
      description,
      address,
      image,
      location: {
        lat: location.lat,
        lng: location.lng,
      },
      userId: ownerId,
      deliveryRange,
      status: 1,
    });
    return newShop;
  } catch(err) {
    console.log(err)
    return null;
  }
}
