module.exports = (connection, DataTypes) => {
	//why video used sequelize and not connection above?
	const schema = {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					args: [true],
					msg: "name cannot be an empty string",
				},
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true,
				notEmpty: {
					args: [true],
					msg: "no email inserted",
				},
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [8],
					msg: "Password needs to be longer than 8 characters",
				},
			},
		},
	};
	const ReaderModel = connection.define("Reader", schema);
	return ReaderModel;
};
