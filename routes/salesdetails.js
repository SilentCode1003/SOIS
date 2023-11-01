var express = require("express");
var router = express.Router();

const {
  InsertTable,
  Select,
  SelectResult,
  UpdateMultiple,
  SelectParameter,
} = require("./repository/soisdb.js");

const helper = require("./repository/customhelper.js");
const { SalesDetail } = require("./model/soismodel.js");
const { ItemsModel } = require("./model/model.js");
const { Validator } = require("./controller/middleware.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "salesdetails");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from sales_detail`;
    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);
      if (result.length != 0) {
        let data = SalesDetail(result);
        console.log(data);

        res.json({
          msg: "success",
          data: data,
        });
      } else {
        res.json({
          msg: "success",
          data: result,
        });
      }
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.post("/save", (req, res) => {
  try {
    const { id, posid, cashier, paymenttype, details, total } = req.body;
    let date = helper.GetCurrentDatetime();
    let sales_detail = [
      [id, posid, date, cashier, paymenttype, details, total],
    ];

    InsertTable("sales_detail", sales_detail, (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);

      res.json({
        msg: "success",
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.post("/getdetailid", (req, res) => {
  try {
    const { posid } = req.body;
    let sql =
      "select * from sales_detail where sd_posid = ? order by sd_id desc limit 1";
    let detailid = `${posid}0000`;

    SelectParameter(sql, [posid], (err, result) => {
      if (err) console.error("Error: ", err);

      if (result.length != 0) {
        let data = SalesDetail(result);
        console.log(data);

        res.json({
          msg: "success",
          data: [{ detailid: data[0].id }],
        });
      } else {
        res.json({
          msg: "success",
          data: [{ detailid: detailid }],
        });
      }
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.post("/getdetails", (req, res) => {
  try {
    const { id } = req.body;
    let sql = "select * from sales_detail where sd_id=?";

    SelectParameter(sql, [id], (err, result) => {
      if (err) console.error("Error: ", err);

      if (result.length != 0) {
        let data = SalesDetail(result);
        console.log(data);

        res.json({
          msg: "success",
          data: data,
        });
      } else {
        res.json({
          msg: "success",
          data: result,
        });
      }
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
