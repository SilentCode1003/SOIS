var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

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

var app = express();

const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBSession = require("connect-mongodb-session")(session);

const mysql = require("./routes/repository/soisdb");

//mongodb
mongoose.connect("mongodb://localhost:27017/SOIS").then((res) => {
  console.log("MongoDB Connected!");
});

const store = new MongoDBSession({
  uri: "mongodb://localhost:27017/SOIS",
  collection: "SOISSessions",
});

//Session
app.use(
  session({
    secret: "5L Secret Key",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
