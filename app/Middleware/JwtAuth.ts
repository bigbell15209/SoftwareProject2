import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
const jwt = require("jsonwebtoken");
import Env from "@ioc:Adonis/Core/Env";


export default class JwtAuth {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const token  = request.headers().authorization?.replace("Bearer ", "");
    if (!token || !jwt.verify(token, Env.get("JWT_SECRET")))
      return response.unauthorized({error: "Invalid token."})
    await next();
  }
}
