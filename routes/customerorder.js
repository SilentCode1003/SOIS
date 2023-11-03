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
const dictionary = require("./repository/dictionary.js");
const { CustomerOrder, CustomerCredit } = require("./model/soismodel.js");
const { Validator } = require("./controller/middleware.js");
const {
  CustomerCredit_Check,
  BalanceHistory_Create,
} = require("./repository/credit.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "customerorder");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from customer_order`;
    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);
      if (result.length != 0) {
        let data = CustomerOrder(result);
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
    const { customerid, details, total, paymenttype } = req.body;
    let status = dictionary.GetValue(dictionary.PND());
    let customer_order = [
      [
        customerid,
        helper.GetCurrentDatetime(),
        details,
        total,
        paymenttype,
        status,
      ],
    ];

    InsertTable("customer_order", customer_order, (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);

      let request_order = [[result[0].id, helper.GetCurrentDatetime(), status]];
      InsertTable("request_order", request_order, (err, result) => {
        if (err) console.error("Error: ", err);

        console.log(result);

        if (paymenttype == "UH POINTS") {
          CustomerCredit_Check(customerid)
            .then((result) => {
              if (err) console.error("Error: ", err);

              let balance = result[0].balance - parseFloat(total);
              let creditid = result[0].id;

              let customer_credit = [balance, customerid];
              let update_customer_credit =
                "update customer_credit set cc_balance=? where cc_customerid=?";
              UpdateMultiple(
                update_customer_credit,
                customer_credit,
                (err, result) => {
                  if (err) console.error("Error: ", err);
                  console.log(result);

                  let balance_history = [
                    [
                      creditid,
                      helper.GetCurrentDatetime(),
                      -total,
                      dictionary.GetValue(dictionary.PUEWLT()),
                    ],
                  ];
                  BalanceHistory_Create(balance_history)
                    .then((result) => {
                      console.log(result);

                      return res.json({
                        msg: "success",
                      });
                    })
                    .catch((error) => {
                      return res.json({
                        msg: error,
                      });
                    });
                }
              );
            })
            .catch((error) => {
              return res.json({
                msg: error,
              });
            });
        } else {
          return res.json({
            msg: "success",
          });
        }
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.post("/getorderhistory", (req, res) => {
  try {
    const { customerid } = req.body;
    let sql = "select * from customer_order where co_customerid=?";

    SelectParameter(sql, [customerid], (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);

      let data = CustomerOrder(result);
      res.json({
        msg: "success",
        data: data,
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
