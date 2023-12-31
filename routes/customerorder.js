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
const {
  CustomerOrder,
  CustomerCredit,
  Customer,
  CustomerFeedbackHistory,
} = require("./model/soismodel.js");
const { Validator } = require("./controller/middleware.js");
const {
  CustomerCredit_Check,
  BalanceHistory_Create,
  GetCustomer,
} = require("./repository/credit.js");
const { SendEmail } = require("./repository/mailer.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "customerorder");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from customer_order order by co_id desc`;
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
      let customer_order_id = result[0].id;

      GetCustomer(customerid, (err, result) => {
        if (err) console.error(err);
        let data = Customer(result);
        let fullname = `${data[0].firstname} ${data[0].middlename} ${data[0].lastname}`;

        SendEmail(
          data[0].email,
          `Urban Hideout - OR#: ${customer_order_id}`,
          helper.EmailContent(
            details,
            customer_order_id,
            fullname,
            paymenttype,
            data[0].address
          )
        );
      });

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
    let sql = `select 
      co_id,
      co_customerid,
      co_date,
      co_details,
      co_total,
      co_paymenttype,
      co_status,
      cf_id,
      cf_orderid,
      cf_ratingid,
      cf_message
      from customer_order 
      left join customer_feedback on co_id = cf_orderid
      where co_customerid=? order by co_id desc`;

    SelectParameter(sql, [customerid], (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);

      let data = CustomerFeedbackHistory(result);
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

router.post("/getactiveorder", (req, res) => {
  try {
    const { customerid } = req.body;
    let data = [
      customerid,
      dictionary.GetValue(dictionary.CMP()),
      dictionary.GetValue(dictionary.CND()),
    ];
    let sql =
      "select * from customer_order where co_customerid=? and not co_status in (?,?) order by co_id desc";
    let sql_active_customer_order = helper.SelectStatement(sql, data);

    Select(sql_active_customer_order, (err, result) => {
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

router.post("/getorderdetail", (req, res) => {
  try {
    const { orderid } = req.body;
    let sql = "select * from customer_order where co_id=?";

    SelectParameter(sql, [orderid], (err, result) => {
      if (err) console.error("Error: ", err);

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

router.post("/getitemorderdetail", (req, res) => {
  try {
    const { orderid } = req.body;
    let sql = `select 
    co_id,
    concat(c_firstname,' ', c_middlename,' ', c_lastname) as co_customerid,
    co_date,
    co_details,
    co_total,
    co_paymenttype,
    co_status
    from customer_order 
    inner join customer on co_customerid = c_id
    where co_id=? order by co_id desc`;

    SelectParameter(sql, [orderid], (err, result) => {
      if (err) console.error("Error: ", err);

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

router.get("/getallactiveorder", (req, res) => {
  try {
    let data = [
      dictionary.GetValue(dictionary.CMP()),
      dictionary.GetValue(dictionary.CND()),
    ];
    let sql = "select * from customer_order where not co_status in (?,?)";
    let sql_active_customer_order = helper.SelectStatement(sql, data);

    Select(sql_active_customer_order, (err, result) => {
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
