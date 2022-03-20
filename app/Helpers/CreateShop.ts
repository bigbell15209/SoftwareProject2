const mongoose = require("mongoose");
const Shop = mongoose.model("Shop");

export default async function createShop(ownerId: string, shop: any) {
  const { name, description, address, image, coords, deliveryRange } = shop;
  try {
    const newShop = await Shop.create({
      name,
      description,
      address,
      image,
      location: {
        type: "Point",
        coordinates: [coords.lng, coords.lat],
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
