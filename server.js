/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRouter = require('./routes/inventoryRoute');
const utilities = require("./utilities/")


/* ***********************
 * View Engines and Templates 
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/
app.use(static)

// Index route
app.get("/", baseController.buildHome)
app.use('/inv', inventoryRouter);



app.get("/errors/trigger", (req, res, next) => {
  const err = new Error("Intentional 500 test error")
  err.status = 500
  next(err)
})

app.use((req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." })
})
/* Centralized Error Handler (last) */
app.use(async (err, req, res, next) => {
  const status = err.status || 500
  const nav = await utilities.getNav().catch(() => "")
  const titles = {
    400: "400 Bad Request",
    401: "401 Unauthorized",
    403: "403 Forbidden",
    404: "404 Not Found",
    500: "500 Server Error",
  }
  const title = titles[status] || `${status} Error`
  const message = status === 404
    ? (err.message || "The requested resource was not found.")
    : "Oh no! There was a crash. Maybe try a different route?"

  if (status >= 500) {
    console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
    console.error(err.stack || err)
  }

  res.status(status).render("errors/error", {
    title,
    status,
    message,
    nav,
    // pass err only in dev if you want to show a <details>
    err: process.env.NODE_ENV !== "production" ? err : null,
  })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})