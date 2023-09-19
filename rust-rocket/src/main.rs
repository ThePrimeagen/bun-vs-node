mod routes;

#[macro_use] extern crate rocket;

#[launch]
fn rocket() -> _ {
    rocket::build().attach(routes::hello::router()).attach(routes::json::router())
}
