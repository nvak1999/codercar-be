const fs = require("fs");
const csv = require("csvtojson");

const createCar = async () => {
  let newData = await csv().fromFile("data.csv");
  let db = JSON.parse(fs.readFileSync("db.json"));

  newData = newData.map((e) => {
    const newCar = {
      make: e.Make,
      model: e.Model,
      release_date: e.Year,
      transmission_type: e,
      size: e,
      style: e,
      price: e,
      isDeleted: e,
      timestamps: e,
    };
    db.car.push(newCar);
  });
  console.log(db);
  console.log(newData[1]);
};
createCar();
