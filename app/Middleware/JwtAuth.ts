import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
const jwt = require("jsonwebtoken");
import Env from "@ioc:Adonis/Core/Env";
const mongoose = require("mongoose");
const User = mongoose.model("User");

export default class JwtAuth {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const token = request.headers().authorization?.replace("Bearer ", "");
    if (!token || !jwt.verify(token, Env.get("JWT_SECRET")))
      return response.unauthorized({ error: "Invalid token." });
    request["user"] = await User.findOne({ userId: jwt.decode(token).sub });
    await next();
  }
}
