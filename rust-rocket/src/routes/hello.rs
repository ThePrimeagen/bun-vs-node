pub fn router() -> rocket::fairing::AdHoc {
    rocket::fairing::AdHoc::on_ignite("Routes", |rocket| async {
        rocket
            .mount("/hello", routes![hello])
    })
}

#[get("/")]
pub fn hello() -> &'static str {
    "Hello, rocket!"
}
