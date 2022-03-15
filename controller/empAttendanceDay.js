const EmpAttendanceDay = require("../models/EmpAttendanceDay");
const EmpAttendance = require("../models/EmpAttendance");
const { isValidObjectId } = require("mongoose");

exports.empAddDayAttendance = async (req, res, next) => {
	try {
		const { empAttendanceId, status } = req.body;

		const error = {};
		if (isValidObjectId(empAttendanceId)) {
			const isExistAttendance = await EmpAttendance.exists({ _id: empAttendanceId });

			if (isExistAttendance) {
				const newAttendDay = new EmpAttendanceDay({
					empAttendanceId,
					status,
				});
				await newAttendDay.save();

				const totalDay = await EmpAttendanceDay.countDocuments({ empAttendanceId });
				const totalPresent = await EmpAttendanceDay.countDocuments({ $and: [{ empAttendanceId }, { status: "present" }] });
				const totalAbsent = await EmpAttendanceDay.countDocuments({ $and: [{ empAttendanceId }, { status: "absent" }] });

				await EmpAttendance.updateOne(
					{ _id: empAttendanceId },
					{
						totalDay,
						totalPresent,
						totalAbsent,
					}
				);

				return res.json({ message: "Attendance count" });
			} else {
				error.message = "No attendance with the attendance id!";
			}
		} else {
			error.message = "Invalid object id!";
		}

		return res.status(400).json({ error });
	} catch (err) {
		next(err);
	}
};
