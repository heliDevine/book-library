module.exports = (connection, DataTypes) => {
	//why video used sequelize and not connection above?

	const schema = {
		title: { type: DataTypes.STRING, allowNull: false },
		author: { type: DataTypes.STRING, allowNull: false },
		genre: { type: DataTypes.STRING, allowNull: false },
		ISBN: { type: DataTypes.STRING, allowNull: false },
	};
	const BookModel = connection.define("Book", schema);
	return BookModel;
};

// Make sure constraints and validation are added to the Book model.
// Make sure the controller knows how to handle the different error messages the model might throw.
// Write unit tests that make sure that this functionality is in place.
