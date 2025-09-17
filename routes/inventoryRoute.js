// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const errorController = require("../controllers/errorController");

console.log('invController:', invController);
// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);


// Route to build inventory by identification view
router.get("/detail/:invId", invController.buildByInventoryId);


// Error handling middleware
router.get('/trigger', errorController.throwError);



module.exports = router;