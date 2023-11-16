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
const { BalanceHistory } = require("./model/soismodel.js");
const { Validator } = require("./controller/middleware.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "balancehistory");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from balance_history order by bh_id desc`;
    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);
      if (result.length != 0) {
        let data = BalanceHistory(result);
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
    const { creditid, date, amount, type } = req.body;
    let balance_history = [[creditid, date, amount, type]];

    InsertTable("balance_history", balance_history, (err, result) => {
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

router.post("/getbalance", (req, res) => {
  try {
    const { customerid } = req.body;
    let sql = `select
              bh_id,
              bh_creditid,
              bh_date,
              bh_amount,
              bh_type 
              from customer_credit
              inner join balance_history on cc_id = bh_creditid
              where cc_customerid = ?
              order by bh_id desc`;

    SelectParameter(sql, [customerid], (err, result) => {
      if (err) console.error("Error: ", err);
      if (result.length != 0) {
        let data = BalanceHistory(result);
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
