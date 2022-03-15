const Employee = require("../models/Employee");

exports.getAllEmployee = async (req, res, next) => {
	try {
		const employee = await Employee.find({});
		res.status(200).json({
			message: "Employee list",
			data: employee,
		});
	} catch (err) {
		next(err);
	}
};
exports.getEmployeeById = async (req, res, next) => {
	try {
		const _id = req.params.empId;
		const employee = await Employee.findById(_id);
		res.status(200).json({
			message: "Employee details",
			data: employee,
		});
	} catch (err) {
		next(err);
	}
};

exports.addEmployee = async (req, res, next) => {
	try {
		const { name } = req.body;
		//const {name, status} = req.body;
		const addNewEmployee = new Employee({
			name,
		});
		await addNewEmployee.save();
		res.status(201).json({
			message: "Instead was successfully!!",
			data: addNewEmployee,
		});
	} catch (err) {
		next(err);
	}
};

exports.employeeQuery = async (req, res, next) => {
	const { searchKeyWord } = req.body;

	try {
		let foundEmployee = [];
		if (searchKeyWord) {
			function es(str) {
				return str.replace(/[-\/\\^$*+?()|[\]{}]/g, "");
			}
			let KeyWordRegExp = new RegExp("^" + es(searchKeyWord), "i"); // Match from starting

			foundEmployee = await Employee.find({ name: KeyWordRegExp });
		}

		return res.json({ foundEmployee });
	} catch (err) {
		next(err);
	}
};
