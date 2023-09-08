const express = require("express");
const router = express.Router();
const User = require("../controllers/user");

router.get("/", User.getUserAll);

router.get("/:id", User.getUser);

router.post("/add", User.addUser);

router.post("/update/", User.updateUser);

router.delete("/:id", User.updateUser);

module.exports = router;
