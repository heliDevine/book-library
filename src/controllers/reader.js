// const { Reader } = require("../models");
const app = require("../app");
const { Reader } = require("../models");

/// CREATE
exports.create = async (req, res) => {
	const newReader = await Reader.create(req.body);
	res.status(201).json(newReader);
	console.log("****hello from *****222 create function");
};
//// FIND ALL
exports.findAll = async (req, res) => {
	await Reader.findAll().then((readers) => res.json(readers));
};

//// FIND BY PRIMARY KEY

exports.findByPK = async (req, res) => {
	const reader = await Reader.findByPK(req.params.id);
	if (!reader) {
		res.status(404).send("The reader could not be found.");
	} else {
		res.status(200).json(reader);
	}
	console.log("****hello from *****9999 findbyPK function");
};

// exports.findByPK = async (req, res) => {
// 	let query;
// 	if (req.params.userId) {
// 		query = Reader.findByPK({
// 			include: [
// 				{ model: Reader, where: { id: req.params.userId } },
// 			],
// 		});
// 	} else {
// 		query = Reader.findByPK({ include: [Tag, User] });
// 	}
// 	return query.then((reader) => res.json(reader));
// });

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
