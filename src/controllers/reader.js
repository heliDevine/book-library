const { Reader } = require('../models');

/// CREATE new reader
exports.create = async (req, res) => {
	try {
		const newReader = await Reader.create(req.body);

		res.status(201).json(`reader ${newReader.name} created`);
	} catch (err) {
		if (err.name === 'SequelizeValidationError') {
			res.status(400).json({ errors: err.errors });
		} else {
			res.status(500).json(err);
		}
	}
};
//// FIND ALL
exports.findAll = (req, res) => {
	Reader.findAll({
		/// returns only id, name and email to keep list of items shorter and password not sent to client
		attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
	})
		.then((readers) => res.json(readers))
		.catch((err) => res.status(404).send(err));
};

//// FIND BY PRIMARY KEY

exports.findById = async (req, res) => {
	const reader = await Reader.findByPk(req.params.id);
	try {
		if (reader) {
			res
				.status(200)
				// returns only name and email to user
				.json(`${reader.dataValues.name}, ${reader.dataValues.email},`);
		} else {
			res.status(404).json({ error: 'The reader could not be found.' });
		}
	} catch (err) {
		res.status(500).send(err);
	}
};
//// UPDATE READER

exports.updateEmail = async (req, res) => {
	const readerId = req.params.id;
	const updateData = req.body;
	const updatedRows = await Reader.update(updateData, {
		where: { id: readerId },
	});

	if (updatedRows) {
		// returns only updated name and email to the user
		res
			.status(200)
			.json(
				`${updateData.name} your details have been updated with new email: ${updateData.email}`
			);
	} else {
		res.status(404).json({ error: 'The reader could not be found.' });
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
			res.status(404).json({ error: 'The reader could not be found.' });
		} else {
			res.sendStatus(204);
		}
	} catch (err) {
		res.status(500).send(err);
	}
};
