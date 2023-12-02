var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { SetMongo } = require("./routes/controller/mongoose");

var dashboardRouter = require("./routes/dashboard");
var masterEmployeeRouter = require("./routes/masteremployee");
var masterAccessRouter = require("./routes/masteraccess");
var masterPositionRouter = require("./routes/masterposition");
var masterPaymentRouter = require("./routes/masterpayment");
var masterCategoryRouter = require("./routes/mastercategory");
var masterPosRouter = require("./routes/masterpos");
var masterUserRouter = require("./routes/masteruser");
var masterStoreRouter = require("./routes/masterstore");
var productRouter = require("./routes/product");
var salesDetailsRouter = require("./routes/salesdetails");
var customerRouter = require("./routes/customer");
var customerOrderRouter = require("./routes/customerorder");
var requestOrderRouter = require("./routes/requestorder");
var customerCreditRouter = require("./routes/customercredit");
var balanceHisotryRouter = require("./routes/balancehistory");
var productInventoryRouter = require("./routes/productinventory");
var salesInventoryRouter = require("./routes/salesinventory");
var inventoryHistoryRouter = require("./routes/inventoryhistory");
var loginRouter = require("./routes/login");
var customerfeedbackRouter = require("./routes/customerfeedback");
var masterratingRouter = require("./routes/masterrating");
var reportsRouter = require("./routes/reports");

var app = express();

SetMongo(app);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", dashboardRouter);
app.use("/masteremployee", masterEmployeeRouter);
app.use("/masteraccess", masterAccessRouter);
app.use("/masterposition", masterPositionRouter);
app.use("/masterpayment", masterPaymentRouter);
app.use("/mastercategory", masterCategoryRouter);
app.use("/masterpos", masterPosRouter);
app.use("/masteruser", masterUserRouter);
app.use("/masterstore", masterStoreRouter);
app.use("/product", productRouter);
app.use("/salesdetails", salesDetailsRouter);
app.use("/customer", customerRouter);
app.use("/customerorder", customerOrderRouter);
app.use("/requestorder", requestOrderRouter);
app.use("/customercredit", customerCreditRouter);
app.use("/balancehistory", balanceHisotryRouter);
app.use("/productinventory", productInventoryRouter);
app.use("/salesinventory", salesInventoryRouter);
app.use("/inventoryhistory", inventoryHistoryRouter);
app.use("/login", loginRouter);
app.use("/customerfeedback", customerfeedbackRouter);
app.use("/reports", reportsRouter);
app.use("/masterrating", masterratingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
