module.exports = (connection, DataTypes) => {
	//why video used sequelize and not connection above?

	const schema = {
		name: {
			type: DataTypes.STRING,
			// allowNull: false
		},

		email: {
			type: DataTypes.STRING,
			validate: {
				// allowNull: true,
				isEmail: true,
			},
		},

		password: { type: DataTypes.STRING },
		// validate: {
		// 	len: {
		// 		args: [8],
		// 		msg: "Password needs to be longer than 8 characters",
		// 	},

		// allowNull: true,
		/// form tutorial
		//len: [2,10],
		// only allow values with length between 2 and 10

		// len: [8],
		// len(value) {
		// 	if (value < 8) {
		// 		throw new Error("Password needs to be longer than 8 characters");
		// 	}
		// },
	};
	const ReaderModel = connection.define("Reader", schema);
	return ReaderModel;
};

// Make sure password is longer than 8 characters

// Make sure the controller knows how to handle the different error messages the model might throw.

// Don't forget to write tests that support this functionality
