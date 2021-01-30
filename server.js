const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const app = express();

//controllers
const cities = require("./controllers/cities");
const forecasts = require("./controllers/forecasts");
const temperatures = require("./controllers/temperatures");
const webhooks = require("./controllers/webhooks");

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("uploads"));

//database details
//ensure its editted to suit your postgres database
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "postgress",
    database: "acumen",
  },
});

app.post("/cities", (req, res, next) => {
  try {
    cities.handleCreate(req, res, db);
  } catch (e) {
    return next(e);
  }
});

app.patch("/cities/:id", (req, res, next) => {
  try {
    cities.handleUpdate(req, res, db);
  } catch (e) {
    return next(e);
  }
});

app.delete("/cities/:id", (req, res, next) => {
  try {
    cities.handleDelete(req, res, db);
  } catch (e) {
    return next(e);
  }
});

app.post("/temperatures", (req, res, next) => {
  try {
    temperatures.handleTemperature(req, res, db);
  } catch (e) {
    return next(e);
  }
});

app.get("/forecasts/:id", (req, res, next) => {
  try {
    forecasts.handleForcast(req, res, db);
  } catch (e) {
    return next(e);
  }
});

app.post("/webhooks", (req, res, next) => {
  try {
    webhooks.handleWebhook(req, res, db);
  } catch (e) {
    return next(e);
  }
});

app.delete("/webhooks/:id", (req, res, next) => {
  try {
    webhooks.handleDeleteWebhook(req, res, db);
  } catch (e) {
    return next(e);
  }
});

app.get("/", (req, res) => {
  res.json("Api is working");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port 3000 || ${process.env.PORT}`);
});
