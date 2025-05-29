const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

/* ***************************
 *  Build inventory by Inventory Id view
 * ************************** */
  invCont.buildByInventoryId = async function (req, res, next) {
    const invId = parseInt(req.params.invId);
    let nav = await utilities.getNav();
  try {
    const data = await invModel.getInventoryById(invId);

    // Build the vehicleHtml object explicitly with needed fields
    const vehicleHtml = {
      year: data.inv_year,
      make: data.inv_make,
      model: data.inv_model,
      price: data.inv_price,
      miles: data.inv_miles,
      color: data.inv_color,
      description: data.inv_description,
      transmission: data.inv_transmission,
      fuel: data.inv_fuel_type,
      drive: data.inv_drive,
      image: data.inv_image,
    };

    const itemName = `${data.inv_make} ${data.inv_model}`;

    res.render("./inventory/detail", {
      title: itemName,
      nav,
      vehicleHtml,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = invCont;

