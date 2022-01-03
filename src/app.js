const express = require("express");
const readerController = require("./controllers/reader");
// const router = express.Router();

const app = express();
app.use(express.json());

// app.get("/", (req, res) => {
// 	res.status(201).send("this is the root");
// });

app.post("./readers", (req, res) => {
	res.status(201).send("reader created");
});

// create a reader
// app.post("/readers", (req, res) => {
// 	Reader.create(req.body).then((user) => res.json(user));
// });

module.exports = app;
