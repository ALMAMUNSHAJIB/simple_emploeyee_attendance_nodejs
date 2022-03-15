const { Schema, model } = require("mongoose");

const employeeSchema = Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		status: {
			type: String,
			enum: ["active", "Inactive"],
			default: "active",
		},
	},
	{
		timestamps: true,
	}
);

const Employee = model("Employee", employeeSchema);
module.exports = Employee;
