const express = require("express");
const router = express.Router();

// CAR
const carAPI = require("./car.api");
router.use("/cars", carAPI);
router.get("/", function (req, res, next) {
  res.send("hello world");
});
module.exports = router;
