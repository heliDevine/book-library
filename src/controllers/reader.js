const app = require("../app");
const { Reader } = require("../models");

/// CREATE
exports.create = async (req, res) => {
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
};
//// FIND ALL
exports.findAll = (req, res) => {
	Reader.findAll()
		.then((readers) => res.json(readers))
		.catch((err) => res.status(404).send(err));
};

//// FIND BY PRIMARY KEY

exports.findById = async (req, res) => {
	const reader = await Reader.findByPk(req.params.id);
	try {
		if (reader) {
			res.status(200).json(reader);
		} else {
			res.status(404).json({ error: "The reader could not be found." });
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

//// UPDATE READER

exports.updateEmail = async (req, res) => {
	const readerId = req.params.id;
	const updateData = req.body;

	const [updatedRows] = await Reader.update(updateData, {
		where: { id: readerId },
	});

	if (updatedRows) {
		res.status(200).json(updatedRows);
	} else {
		res.status(404).json({ error: "The reader could not be found." });
	}
};

//// DELETE reader
exports.deleteReader = async (req, res) => {
	const readerId = req.params.id;

	const deleteRows = await Reader.destroy({
		where: { id: readerId },
	});
	try {
		if (!deleteRows) {
			res.status(404).json({ error: "The reader could not be found." });
		} else {
			res.sendStatus(204);
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

/// MY SOLUTION TO CREATE FUNCTION

// exports.create = (req, res) => {
// 	Reader.create(req.body)
// 		.then((reader) => {
// 			if (reader) {
// 				res.status(201).json(reader);
// 			} else {
// 				res.status(500).json({ error: "reader not created" });
// 			}
// 			console.log("****hello from *****3333 create function");
// 		})
// 		.catch((e) => console.log(`create an error ${e}`));
// };

// exports.create = (req, res) => {
// 	res.status(201).send("reader created");
// 	console.log("****hello from create function");
// };
