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
}
