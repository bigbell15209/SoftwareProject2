import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
const mongoose = require("mongoose");
import Hash from "@ioc:Adonis/Core/Hash";
const User = mongoose.model("User");

export default class AccountController {
  public async update({ request, response }: HttpContextContract) {
    const user = request["user"]!;
    const { firstName, lastName, address } = request.body();
    //TODO add empty string validations
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    if (address) {
      const { street, city, province } = address;
      user.address = {
        street: street || user.address.street,
        city: city || user.address.city,
        province: province || user.address.province,
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
