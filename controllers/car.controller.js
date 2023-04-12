const mongoose = require("mongoose");
const { sendResponse, AppError } = require("../helpers/utils.js");
const Car = require("../models/Car");
const carController = {};

carController.createCar = async (req, res, next) => {
  const { make, model, release_date, transmission_type, price, size, style } =
    req.body;

  try {
    if (
      !make ||
      !model ||
      !release_date ||
      !transmission_type ||
      !price ||
      !size ||
      !style
    ) {
      throw new AppError(402, "Bad Request", "Create Car Error");
    }

    const created = await Car.create({
      make,
      model,
      release_date,
      transmission_type,
      price,
      size,
      style,
    });
    sendResponse(
      res,
      200,
      true,
      { data: created },
      null,
      "Create Car Successfully!"
    );
  } catch (err) {
    next(err);
  }
};

carController.getCars = async (req, res, next) => {
  let { page, limit } = req.query;
  limit = parseInt(limit) || 10;
  page = parseInt(page) || 1;
  let start = page === 1 ? page - 1 : page * limit - limit;
  let end = page * limit;
  const filter = {};
  try {
    let listCar = await Car.find(filter)
      .skip(limit * (page - 1))
      .limit(limit);
    sendResponse(
      res,
      200,
      true,
      { cars: listCar },
      null,
      `Get Car List Successfully!`,
      page
    );
  } catch (err) {
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  try {
    const { make, model, release_date, transmission_type, price, size, style } =
      req.body;
    const updateInfo = {
      make,
      model,
      release_date,
      transmission_type,
      price,
      size,
      style,
    };
    const options = { new: true };
    console.log(targetId);
    await Car.findByIdAndUpdate(req.params.id, updateInfo, options);
    sendResponse(res, 200, true, updateInfo, null, "Update Car Successfully!");
  } catch (err) {
    next(err);
  }
};

carController.deleteCar = async (req, res, next) => {
  try {
    const updated = await Car.findByIdAndDelete(req.params.id, { new: true });

    sendResponse(res, 200, true, { car: updated }, null, "Delete car success");
  } catch (err) {
    next(err);
  }
};

module.exports = carController;
