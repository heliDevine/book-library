// const { Reader } = require("../models");
const { Reader } = require("../models");

exports.create = async (req, res) => {
	const newReader = await Reader.create(req.body);
	res.status(201).json(newReader);
	console.log("****hello from *****222 create function");
};
/// MY SOLUTION

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
