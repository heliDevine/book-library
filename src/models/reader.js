module.exports = (connection, DataTypes) => {
	//why video used sequelize and not connection above?

	const schema = {
		name: DataTypes.STRING,
		email: DataTypes.STRING,
	};
	const ReaderModel = connection.define("Reader", schema);
	return ReaderModel;
};
