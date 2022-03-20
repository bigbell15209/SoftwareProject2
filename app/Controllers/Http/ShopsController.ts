import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
const mongoose = require("mongoose");
const Shop = mongoose.model("Shop");

export default class ShopsController {
  public async getNearbyShops({ request, response }: HttpContextContract) {
    const { lat, lng } = request.qs();
    const nearbyShops = await Shop.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: 1_000_000_000_000,
          $minDistance: 0,
        },
      },
    });

    console.log(nearbyShops)


    return nearbyShops
  }
}
