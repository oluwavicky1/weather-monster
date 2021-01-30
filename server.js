const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const footer = require("./controllers/footer");
const contact = require("./controllers/contact");
const becomeTutor = require("./controllers/tutorApply");
const findTutor = require("./controllers/findTutor");
const login = require("./controllers/Login");
const register = require("./controllers/register");
const post = require("./controllers/Admin");
const app = express();

//controllers
const cities = require("./controllers/cities");
const forecasts = require("./controllers/forecasts");
const temperatures = require("./controllers/temperatures");
const webhooks = require("./controllers/webhooks");

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("uploads"));

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "04102000Iv.",
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

app.listen(process.env.PORT || 5000, () => {
  console.log(`app is running on port 5000 || ${process.env.PORT}`);
});

// footer carries a post for subscribe
// contactUs - post for feedback~
// become a tutor - post for tapplication
// hub gist - get from admin post
// find tutor - post for request

// admin page - post for hubgist, post for staffs
// get from request, tapplication, subscribe, staffs,
// delete - posts on hubgist, request, tapplication, staff
