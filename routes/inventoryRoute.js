// Needed Resources 
const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");
const errorController = require("../controllers/errorController");


// Error handling middleware
router.get('/trigger', errorController.throwError);

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);


// Route to build inventory by identification view
router.get("/detail/:invId", invController.buildByInventoryId);

module.exports = router;