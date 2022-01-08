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

// Make sure that name, email and password exist and cannot be empty
// Make sure that email is in the correct format
// Make sure password is longer than 8 characters
// Make sure the controller knows how to handle the different error messages the model might throw.
// Don't forget to write tests that support this functionality
