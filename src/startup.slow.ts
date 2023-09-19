import React from "react";
import _ from "lodash";
import redux from "redux";
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.text());

app.post('/', async (req, res) => {
    res.status(200).send("");
});

app.post('/setup', async (req, res) => {
    res.status(200).send("");
});

console.log(`${String(React)} -- ${_} -- ${String(redux)}`);

