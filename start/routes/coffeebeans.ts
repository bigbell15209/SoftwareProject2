import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "CoffeeBeansController.getAll");
  Route.post("create", "CoffeeBeansController.create");
  Route.post("update", "CoffeeBeansController.update");
  Route.get("details", "CoffeeBeansController.details");
  Route.post("delete", "CoffeeBeansController.delete");
})
  .prefix("/coffeebeans")
  .middleware("jwtAuth");
