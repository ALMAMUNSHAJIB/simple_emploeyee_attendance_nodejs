const router = require("express").Router();
const { empAddDayAttendance } = require("../controller/empAttendanceDay");

router.post("/", empAddDayAttendance);

module.exports = router;
