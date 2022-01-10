const app = require("../app");
const { Reader, Book } = require("../models");

const createItem =
	/// CREATE ITEM
	(exports.create = async (req, res) => {
		try {
			const newReader = await Reader.create(req.body);

			res.status(201).json(newReader);
		} catch (err) {
			if (err.name === "SequelizeValidationError") {
				res.status(400).json({ errors: err.errors });
			} else {
				res.status(500).json(err);
			}
		}
	});
