import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "ReviewsController.getAll");
  Route.post("/create", "ReviewsController.create");
})
  .middleware(["jwtAuth"])
  .prefix("/reviews");
