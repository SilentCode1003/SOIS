var express = require("express");
var router = express.Router();

const {
  InsertTable,
  Select,
  SelectResult,
  UpdateMultiple,
  SelectParameter,
} = require("./repository/soisdb.js");

const {
  GetCurrentMonthFirstDay,
  GetCurrentMonthLastDay,
  SelectStatement,
  GetCurrentYear,
} = require("./repository/customhelper.js");
const { Validator } = require("./controller/middleware.js");
const { GetValue, ACT, PND } = require("./repository/dictionary.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "dashboard");
});

module.exports = router;

router.get("/getmonthlysales", (req, res) => {
  try {
    let datefrom = `${GetCurrentMonthFirstDay()} 00:00`;
    let dateto = `${GetCurrentMonthLastDay()} 23:59`;
    let data = [datefrom, dateto];
    let sql = `select sum(sd_total) as total from sales_detail where sd_date between ? and ?`;
    let command = SelectStatement(sql, data);

    console.log(command);

    Select(command, (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);
      res.json({
        msg: "success",
        data: result[0].total,
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.get("/getyearlysales", (req, res) => {
  try {
    let currentyear = GetCurrentYear();
    let sql =
      "select sum(sd_total) as total from sales_detail where sd_date like ?";
    let data = [currentyear + "%"];

    let command = SelectStatement(sql, data);

    console.log(command);

    Select(command, (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);
      res.json({
        msg: "success",
        data: result[0].total,
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.get("/getorders", (req, res) => {
  try {
    let status = GetValue(ACT());
    let sql =
      "select count(*) as total from customer_order where not co_status=?";

    SelectParameter(sql, [status], (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);
      res.json({
        msg: "success",
        data: result[0].total,
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.get("/getpendingorder", (req, res) => {
  try {
    let status = GetValue(PND());
    let sql = "select count(*) as total from customer_order where co_status=?";

    SelectParameter(sql, [status], (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);
      res.json({
        msg: "success",
        data: result[0].total,
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
