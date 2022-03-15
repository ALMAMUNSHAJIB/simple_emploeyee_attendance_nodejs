const router = require("express").Router();
const { signupController, getUserController, signinController } = require("../controller/user");
const { checkLogin } = require("../middleware/auth");
router.get("/", checkLogin, getUserController);
router.post("/signup", signupController);
router.post("/signin", signinController);

module.exports = router;
