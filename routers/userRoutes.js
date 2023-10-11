const express = require("express");
const { register, login, update, deleteUser } = require("../controllers/userController");
const router = express.Router();




router.route("/register").post(register)
router.route("/login").post(login)

router.route("/update/:id").put(update)
router.route("/delete/:id").delete(deleteUser)

module.exports = router;