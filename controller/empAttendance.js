const EmpAttendance = require("../models/EmpAttendance");
const Employee = require("../models/Employee");
const { isValidObjectId } = require("mongoose");
exports.getAllEmpAttendanceList = async (req, res, next) => {
	try {
		const empAttendanceList = await EmpAttendance.find({});
		res.status(200).json({
			message: "Success",
			data: empAttendanceList,
		});
	} catch (err) {
		next(err);
	}
};

exports.addEmpAttendanceList = async (req, res, next) => {
	const { employeeId } = req.body;

	try {
		const error = {};
		if (isValidObjectId(employeeId)) {
			const isEmployeeExist = await Employee.exists({ _id: employeeId });
			if (isEmployeeExist) {
				const alreadyAttendanceCreated = await EmpAttendance.exists({ employee: employeeId });
				if (!alreadyAttendanceCreated) {
					const newAttendanceList = new EmpAttendance({
						employee: employeeId,
					});
					await newAttendanceList.save();
					res.status(201).json({ message: "Inserted success!!", newAttendanceList });
				} else {
					error.message = "Already created attendance under the Employee!";
				}
			} else {
				error.message = "Employee not found!";
			}
		} else {
			error.message = "Invalid object id!";
		}

		return res.status(400).json({ error });
	} catch (err) {
		next(err);
	}
};

exports.employeeDetails = async (req, res, next) => {
	const { employeeId } = req.body;

	try {
		const error = {};
		if (isValidObjectId(employeeId)) {
			const details = await EmpAttendance.findOne({ employee: employeeId });

			if (details) {
				return res.json({ details });
			} else {
				error.message = "Not found!";
			}
		} else {
			error.message = "Invalid object id!";
		}

		return res.status(400).json({ error });
	} catch (err) {
		next(err);
	}
};
