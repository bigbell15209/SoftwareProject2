import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
const mongoose = require("mongoose");
const Shop = mongoose.model("Shop");
const CoffeeBean = mongoose.model("CoffeeBean");
import { getDistance } from "geolib";

export default class ShopsController {
  public async getNearbyShops({ request, response }: HttpContextContract) {
    let { lat, lng } = request.qs();
    lat = parseFloat(lat);
    lng = parseFloat(lng);

    const allShops = await Shop.find();
    const shops: object[] = [];
    for (let i = 0; i < allShops.length; i++) {
      const beans = (await CoffeeBean.find({ shopId: allShops[i].shopId }))
      .map(bean => ({
        coffeeBeanId: bean.coffeeBeanId,
        shopId: bean.shopId,
        name: bean.name,
        description: bean.description,
        price: bean.price,
        specie: bean.specie,
        origin: bean.origin,
        roastingLevel: bean.roastingLevel,
      }))
      const shop = {
        shopId: allShops[i].shopId,
        name: allShops[i].name,
        description: allShops[i].description,
        address: allShops[i].address,
        location: {
          lat: allShops[i].location.lat,
          lng: allShops[i].location.lng,
        },
        distance: getDistance(
          { latitude: lat, longitude: lng },
          {
            latitude: allShops[i].location.lat,
            longitude: allShops[i].location.lng,
          }
        ),
        beans,
      };
      shops.push(shop);
    }
    return shops;
  }
}
