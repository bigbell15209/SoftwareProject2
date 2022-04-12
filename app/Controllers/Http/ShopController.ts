/*
Author: Hankyu Shin (301090893)
2022 April 9
This class contains the logic for storeowners
*/

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
const mongoose = require("mongoose");
const Shop = mongoose.model("Shop");

export default class ShopController {
  public async debugInsert({ request, response }: HttpContextContract) {
    if (request.qs()["secret"] !== "secret")
      return response.status(401).json({ error: "Unauthorized" });

    const { name, description, address, image, location } = request.body();
    const { lat, lng } = location;

    const shop = await Shop.create({
      name,
      description,
      image,
      address,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
    });
    return response.json(shop);
  }

  public async shopDetails({ request, response }: HttpContextContract) {
    const userId = request["user"]["userId"];
    const shop = await Shop.findOne({ userId });
    if (!shop) return response.status(404).json({ error: "Shop not found" });

    return response.ok(shop);
  }

  public async update({ request, response }: HttpContextContract) {
    const userId = request["user"]["userId"];
    const shop = await Shop.findOne({ userId });
    if (!shop) return response.status(404).json({ error: "Shop not found" });

    const { name, description, address, location } = request.body();
    const { lat, lng } = location;

    shop.name = name || shop.name;
    shop.description = description || shop.description;
    shop.address = address || shop.address;
    shop.location.lat = lat;
    shop.location.lng = lng;
    await shop.save();

    return response.ok(shop);
  }
}
