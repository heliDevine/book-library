const { Reader } = require("../models");

// const create = (req, res) => {
// 	Reader.create(req.body)
// 		.then((artist) => {
// 			if (artist) {
// 				res.status(201).json(artist);
// 			} else {
// 				res.status(500).json({ error: "reader not created" });
// 			}
// 		})
// 		.catch((e) => console.log(`create an error ${e}`));
// };

exports.create = (req, res) => {
	res.status(201).send("reader created");
};
