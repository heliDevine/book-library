const express = require("express");
const readerController = require("./controllers/reader");
// const { Reader } = require("../models");
// const router = express.Router();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	res.status(201).send("this is the root");
});

// app.post("./readers", (req, res) => {
// 	res.status(201).send("reader created");
// });

/// THIS WORKS

app.post("/readers", readerController.create);

/// THIS WORKS too, but I don't get sends "201"
// app.post("/readers", (req, res) => {
// 	res.status(201).send("ok");
// });

module.exports = app;
