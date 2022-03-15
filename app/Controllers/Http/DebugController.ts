import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
const mongoose = require("mongoose");
const Shop = mongoose.model("Shop");
const CoffeeBean = mongoose.model("CoffeeBean");

export default class ShopController {
  public async insertShop({ request, response }: HttpContextContract) {
    const newShop = await Shop.create(request.body());
  }

  public async insertCoffeeBean({ request, response }: HttpContextContract) {
    const newCoffeeBean = await CoffeeBean.create(request.body());
  }
}
