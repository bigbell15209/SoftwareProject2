import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "ShopController.shopDetails");
  Route.post("update", "ShopController.update");
})
  .middleware(["jwtAuth"])
  .prefix("/shop");
