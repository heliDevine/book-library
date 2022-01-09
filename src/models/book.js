module.exports = (connection, DataTypes) => {
	//why video used sequelize and not connection above?

	const schema = {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					args: [true],
					msg: "book needs to have a title",
				},
			},
		},
		author: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					args: [true],
					msg: "book needs to have an author",
				},
			},
		},

		genre: {
			type: DataTypes.STRING,
			// allowNull: false,
		},

		ISBN: {
			type: DataTypes.STRING,
			// allowNull: false,
		},
	};
	const BookModel = connection.define("Book", schema);
	return BookModel;
};
