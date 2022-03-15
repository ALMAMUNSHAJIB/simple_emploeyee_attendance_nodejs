const router = require("express").Router();
const { getAllEmployee, addEmployee, getEmployeeById, employeeQuery } = require("../controller/employee");
const { checkLogin } = require("../middleware/auth");

router.get("/", checkLogin, getAllEmployee);
router.post("/", checkLogin, addEmployee);
router.get("/employee-query", checkLogin, employeeQuery);
router.get("/:empId", getEmployeeById);

module.exports = router;
