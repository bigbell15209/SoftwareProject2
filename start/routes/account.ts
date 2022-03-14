import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/update", "AccountController.update");
})
  .middleware(["jwtAuth"])
  .prefix("/account");
