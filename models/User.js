const { Schema, model } = require("mongoose");

const userSchema = Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			min: [6, "Password atleast 6 character"],
		},
		status: {
			type: String,
			enum: ["active", "Inactive"],
		},
	},
	{
		timestamps: true,
	}
);

const User = model("User", userSchema);
module.exports = User;
