const { Schema, model, Types } = require("mongoose");

const empAttendanceSchema = Schema(
	{
		totalDay: {
			type: Number,
			default: 0,
		},
		totalPresent: {
			type: Number,
			default: 0,
		},
		totalAbsent: {
			type: Number,
			default: 0,
		},

		employee: {
			type: Types.ObjectId,
			ref: "Employee",
		},
	},
	{
		timestamps: true,
	}
);

const EmpAttendance = model("EmpAttendance", empAttendanceSchema);
module.exports = EmpAttendance;
