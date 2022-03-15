const router = require("express").Router();
const { getAllEmpAttendanceList, addEmpAttendanceList, employeeDetails } = require("../controller/empAttendance");
const { checkLogin } = require("../middleware/auth");

router.get("/", checkLogin, getAllEmpAttendanceList);
router.post("/", addEmpAttendanceList);
router.get("/employee-details", employeeDetails);

module.exports = router;
