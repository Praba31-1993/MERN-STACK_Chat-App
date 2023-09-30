const express = require("express");
const {RegisterUser, LoginUser, LogoutUser, GetAllUser, GetMailer, ResetPassword, updateUser, DeleteUser, RefreshToken} = require("../Controller/UserController");

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/logout", LogoutUser);
router.get("/getalluser", GetAllUser);
router.post("/getMail", GetMailer);
router.post("/resetpassword", ResetPassword);
router.post("/update", updateUser);
router.delete("/delete?:id", DeleteUser);
router.post("/refresh", RefreshToken);







module.exports = router;
