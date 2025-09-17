
const errorController = {}

errorController.throwError = (req, res, next) => {
  const err = new Error("Intentional 500 Error Triggered")
  err.status = 500
  next(err)
}

module.exports = errorController