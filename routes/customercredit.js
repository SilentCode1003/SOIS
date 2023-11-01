var express = require("express");
var router = express.Router();

const {
  InsertTable,
  Select,
  SelectResult,
  UpdateMultiple,
  SelectParameter,
  Update,
} = require("./repository/soisdb.js");

const helper = require("./repository/customhelper.js");
const { GetValue, ACT, AFND } = require("./repository/dictionary.js");
const { CustomerCredit, BalanceHistory } = require("./model/soismodel.js");
const { Validator } = require("./controller/middleware.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "customercredit");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from customer_credit`;
    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);
      if (result.length != 0) {
        let data = CustomerCredit(result);
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
    const { customerid, balance } = req.body;
    let status = GetValue(ACT());
    let customer_credit = [[customerid, balance, status]];

    CustomerCredit_Check(customerid)
      .then((result) => {
        let credit = parseFloat(result[0].balance) + parseFloat(balance);
        let customer_credit_update = [credit, customerid];
        let sql_update =
          "update customer_credit set cc_balance=? where cc_customerid=?";
        let creditid = result[0].id;

        UpdateMultiple(sql_update, customer_credit_update, (err, result) => {
          if (err) console.error("Error: ", err);

          let balance_history = [
            [creditid, helper.GetCurrentDatetime(), balance, GetValue(AFND())],
          ];

          console.log(balance_history);
          BalanceHistory_Create(balance_history)
            .then((result) => {
              console.log(result);
            })
            .catch((error) => {
              res.json({
                msg: error,
              });
            });

          res.json({
            msg: "success",
          });
        });
      })
      .catch((error) => {
        res.json({
          msg: error,
        });
      });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

//#region
function CustomerCredit_Check(data) {
  return new Promise((resolve, reject) => {
    let sql = "select * from customer_credit where cc_customerid=?";
    SelectParameter(sql, [data], (err, result) => {
      if (err) reject(err);

      console.log(result);

      let data = CustomerCredit(result);
      resolve(data);
    });
  });
}

function BalanceHistory_Create(data) {
  return new Promise((resolve, reject) => {
    InsertTable("balance_history", data, (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      console.log(result);
      resolve(result);
    });
  });
}
//#endregion
