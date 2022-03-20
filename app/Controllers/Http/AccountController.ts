import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
const mongoose = require("mongoose");
import Hash from "@ioc:Adonis/Core/Hash";
const User = mongoose.model("User");

export default class AccountController {
  public async me({request, response}){
    const user = request["user"]!;
    return user
  }
  public async update({ request, response }: HttpContextContract) {
    const user = request["user"]!;
    const { firstName, lastName, address } = request.body();

  
    
    
    
    
    //TODO add empty string validations
    user.firstName = firstName.length > 0 ? firstName : user.firstName;
    user.lastName = lastName.length > 0 ? lastName : user.lastName;
    if (address) {
      const { street, city, province } = address;
      user.address = {
        street: street.length > 0 ? street : user.address.street,
        city: city.length > 0 ? city : user.address.city,
        province: province.length > 0 ? province : user.address.province,
      };
    }
    await user.save()

    const updatedUser = await User.find({userId: user.userId});
    return updatedUser
    
  }

  public async changePassword({ request, response }: HttpContextContract) {
    const user = request["user"]!;
    const { oldPassword, newPassword } = request.body();
    if (!(await Hash.verify(user.password, oldPassword)))
      return response.badRequest({ error: "Password does not match." });

    user.password = newPassword;
    await user.save();
  }
}
