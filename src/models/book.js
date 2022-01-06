module.exports = (connection, DataTypes) => {
	//why video used sequelize and not connection above?

	const schema = {
		title: DataTypes.STRING,
		author: DataTypes.STRING,
		genre: DataTypes.STRING,
		ISBN: DataTypes.STRING,
	};
	const BookModel = connection.define("Book", schema);
	return BookModel;
};
