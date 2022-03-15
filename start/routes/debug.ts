import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/signup", "AuthController.signUp");
  Route.post("/signin", "AuthController.signIn");
  Route.get("/signout", "AuthController.signOut");
}).prefix("/auth");
