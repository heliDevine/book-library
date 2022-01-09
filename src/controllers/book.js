const { Book } = require("../models");

// CREATES NEW BOOK
// exports.create = async (req, res) => {
// 	const newBook = await Book.create(req.body);
// 	res.status(201).json(newBook);
// };

exports.create = async (req, res) => {
	try {
		const newBook = await Book.create(req.body);

		res.status(201).json(newBook);
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
	Book.findAll()
		.then((books) => res.json(books))
		.catch((err) => res.status(404).send(err));
};
//// FIND BY PRIMARY KEY

exports.findById = async (req, res) => {
	const book = await Book.findByPk(req.params.id);
	try {
		if (book) {
			res.status(200).json(book);
		} else {
			res.status(404).json({ error: "The book could not be found." });
		}
	} catch (err) {
		res.status(500).send(err);
	}
};
exports.updateTitle = async (req, res) => {
	const bookId = req.params.id;
	const updateData = req.body;

	const [updatedRows] = await Book.update(updateData, {
		where: { id: bookId },
	});

	if (updatedRows) {
		res.status(200).json(updatedRows);
	} else {
		res.status(404).json({ error: "The book could not be found." });
	}
};

//// DELETE book
exports.deleteBook = async (req, res) => {
	const bookId = req.params.id;

	const deleteRows = await Book.destroy({
		where: { id: bookId },
	});
	try {
		if (!deleteRows) {
			res.status(404).json({ error: "The book could not be found." });
		} else {
			res.sendStatus(204);
		}
	} catch (err) {
		res.status(500).send(err);
	}
};
