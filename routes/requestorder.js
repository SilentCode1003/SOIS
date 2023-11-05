var express = require("express");
var router = express.Router();

const {
  InsertTable,
  Select,
  SelectResult,
  UpdateMultiple,
} = require("./repository/soisdb.js");

const helper = require("./repository/customhelper.js");
const disctionary = require("./repository/dictionary.js");
const { RequestOrder } = require("./model/soismodel.js");
const { Validator } = require("./controller/middleware.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "requestorder");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from request_order`;
    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);
      if (result.length != 0) {
        let data = RequestOrder(result);
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

router.post("/status", (req, res) => {
  try {
    const { status, requestid, customerorderid } = req.body;
    let request_order = [];
    let customer_order = [];

    if (status == "CANCEL") {
      request_order = [disctionary.GetValue(disctionary.CND()), requestid];
      customer_order = [disctionary.GetValue(disctionary.CND()), customerorderid];

      RequestOrder_Update(request_order);
      CustomerOrder_Update(customer_order);
    }

    if (status == "ACCEPT") {
      request_order = [disctionary.GetValue(disctionary.CKNG()), requestid];
      customer_order = [disctionary.GetValue(disctionary.CKNG()), customerorderid];

      RequestOrder_Update(request_order);
      CustomerOrder_Update(customer_order);
    }

    if (status == "DELIVERNOW") {
      request_order = [disctionary.GetValue(disctionary.ODLV()), requestid];
      customer_order = [disctionary.GetValue(disctionary.ODLV()), customerorderid];

      RequestOrder_Update(request_order);
      CustomerOrder_Update(customer_order);
    }

    if (status == "DELIVERED") {
      request_order = [disctionary.GetValue(disctionary.CMP()), requestid];
      customer_order = [disctionary.GetValue(disctionary.CMP()), customerorderid];

      RequestOrder_Update(request_order);
      CustomerOrder_Update(customer_order);
    }

    res.json({
      msg: "success",
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

//#region Functions
function RequestOrder_Update(request_order) {
  return new Promise((resolve, reject) => {
    let sql_request_order =
      "update request_order set ro_status=? where ro_id=?";
    UpdateMultiple(sql_request_order, request_order, (err, result) => {
      if (err) reject(err);

      console.log(result);

      resolve(result);
    });
  });
}

function CustomerOrder_Update(customer_order) {
  return new Promise((resolve, reject) => {
    let sql_customer_order =
      "update customer_order set co_status=? where co_id=?";

    UpdateMultiple(sql_customer_order, customer_order, (err, result) => {
      if (err) reject(err);

      console.log(result);
      resolve(result);
    });
  });
}
//#endregion
