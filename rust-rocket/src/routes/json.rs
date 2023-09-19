use rocket::http::Status;
use rocket::serde::json::serde_json::Number;
use rocket::serde::json::{Json, Value};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct User {
    pub id: u32,
    pub name: String,
    pub age: u16,
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Users {
    pub users: Vec<User>,
}

pub fn router() -> rocket::fairing::AdHoc {
    rocket::fairing::AdHoc::on_ignite("Routes", |rocket| async {
        rocket
            .mount("/json", routes![copy, struct_, walk])
    })
}

#[post("/copy", data = "<data>")]
pub async fn copy(data: Json<Value>) -> Result<(Status, Json<Value>), Status> {
    Ok((Status::Ok, data))
}

#[post("/struct", data = "<data>")]
pub async fn struct_(data: Json<Users>) -> Result<(Status, Json<Vec<User>>), Status> {
    let data = data.into_inner();
    Ok((Status::Ok, Json(data.users)))
}

#[post("/walk", data = "<data>")]
pub async fn walk(data: Json<Value>) -> Result<(Status, Json<Value>), Status> {
    let mut data = data.into_inner();
    walk_body(&mut data);

    Ok((Status::Ok, Json(data)))
}

fn walk_body(body: &mut Value) {
    match body {
        Value::Array(arr) => {
            for value in arr.iter_mut() {
                if let Value::Object(_) = value {
                    walk_body(value);
                } else if let Value::Number(num) = value {
                    if let Some(num) = num.as_i64() {
                        *value = Value::Number(Number::from(num + 1));
                    }
                }
            }
        }
        Value::Object(obj) => {
            for (_key, value) in obj.iter_mut() {
                if let Value::Array(_) = value {
                    walk_body(value);
                } else if let Value::Object(_) = value {
                    walk_body(value);
                } else if let Value::Number(num) = value {
                    if let Some(num) = num.as_i64() {
                        *value = Value::Number(Number::from(num + 1));
                    }
                }
            }
        }
        _ => {}
    }
}
