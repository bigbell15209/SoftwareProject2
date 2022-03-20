import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
const mongoose = require("mongoose");
const CoffeeBean = mongoose.model("CoffeeBean");
const Shop = mongoose.model("Shop");
import {v4 as uuid} from "uuid";

export default class CoffeeBeansController {
  public async getAll({ request, response }) {
    console.log(request["user"]);
    const userId = request["user"]!.userId;
    const shop = await Shop.findOne({ userId });
    const coffeeBeans = await CoffeeBean.find({ shopId: shop.shopId });
    return coffeeBeans;
  }
  public async create({ request, response }) {
    const userId = request["user"]!.userId;
    const shop = await Shop.findOne({ userId });

    const { name, description, specie, origin, roastingLevel, price } =
      request.body();

    const newBean = CoffeeBean.create({
      coffeeBeanId: uuid(),
      name,
      description,
      specie,
      origin,
      roastingLevel,
      price,
      shopId: shop.shopId,  
    });
    return response.created(newBean)
  }


  public async update ({request, response}){
    const { coffeeBeanId, name, description, specie, origin, roastingLevel, price } = request.body();

    const coffeeBean = await CoffeeBean.findOne({ coffeeBeanId });
    if (!coffeeBean) 
      return response.notFound({ error: "CoffeeBean not found" });


    coffeeBean.name = name;
    coffeeBean.description = description;
    coffeeBean.specie = specie;
    coffeeBean.origin = origin;
    coffeeBean.roastingLevel = roastingLevel;
    coffeeBean.price = price;
    
    await coffeeBean.save();
    return response.ok(coffeeBean);
  }
}