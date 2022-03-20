import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/me", "AccountController.me");
  Route.post("/update", "AccountController.update");
})
  .middleware(["jwtAuth"])
  .prefix("/account");
