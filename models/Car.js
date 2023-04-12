const mongoose = require("mongoose");
const mongooseURL =
  "mongodb+srv://khuong:Anhkhuong3004@cluster0.lqfqs7p.mongodb.net/car";

const fs = require("fs");
const csv = require("csvtojson");

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    release_date: {
      type: Number,
      min: 1900,
      required: true,
    },
    transmission_type: {
      type: String,
      enum: [
        "MANUAL",
        "AUTOMATIC",
        "AUTOMATED_MANUAL",
        "DIRECT_DRIVE",
        "UNKNOWN",
      ],
      required: true,
    },
    size: {
      type: String,
      enum: ["Compact", "Midsize", "Large"],
      required: true,
    },
    style: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isDeleted: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

carSchema.pre(/^find/, function (next) {
  if (!("_conditions" in this)) return next();
  if (!("isDeleted" in carSchema.paths)) {
    delete this["_conditions"]["all"];
    return next();
  }
  if (!("all" in this["_conditions"])) {
    //@ts-ignore
    this["_conditions"].isDeleted = false;
  } else {
    delete this["_conditions"]["all"];
  }
  next();
});

// const createCar = async () => {
//   await mongoose.connect(mongooseURL);
//   let newData = await csv().fromFile("data.csv");
//   const Cars = mongoose.model("car", carSchema);
//   //   newData = newData.map(async (e) => {
//   //     const newCar = new Cars({
//   //       make: e.Make,
//   //       model: e.Model,
//   //       release_date: e.Year,
//   //       transmission_type: e["Transmission Type"],
//   //       size: e["Vehicle Size"],
//   //       style: e["Vehicle Style"],
//   //       price: parseInt(e.MSRP),
//   //       isDeleted: false,
//   //     });
//   //     await newCar.save();
//   //   });
//   const myCar = await Cars.find({});
//   console.log(myCar);
// };

// createCar();

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
