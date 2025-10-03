const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const inventoryRouter = require('./routes/inventoryRoute');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// mount routers
app.use('/', indexRouter);
app.use('/inv', inventoryRouter);

// 404 handler
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('errors/error', {
    title: "Error",
    message: err.message
  });
});


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* for testing only
app.get('/trigger', (req, res, next) => {
  const err = new Error("Intentional 500 error test");
  err.status = 500;
  next(err);
}); */