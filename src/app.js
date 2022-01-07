const express = require("express");
const readerController = require("./controllers/reader");
const bookController = require("./controllers/book");
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

/// READERS--- fix readers/reader

app.post("/readers", readerController.create);
app.get("/reader", readerController.findAll);
app.get("/reader/:id", readerController.findById);
app.patch("/reader/:id", readerController.updateEmail);
app.delete("/reader/:id", readerController.deleteReader);

app.post("/books", bookController.create);
app.get("/book", bookController.findAll);
app.get("/book/:id", bookController.findById);
app.patch("/book/:id", bookController.updateTitle);
app.delete("/book/:id", bookController.deleteBook);

/// THIS WORKS too, but I don't get sends "201"
// app.post("/readers", (req, res) => {
// 	res.status(201).send("ok");
// });

module.exports = app;
