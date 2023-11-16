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
const { SalesDetail, Product } = require("./model/soismodel.js");
const { ItemsModel } = require("./model/model.js");
const { Validator } = require("./controller/middleware.js");
const {
  CustomerCredit_Check,
  BalanceHistory_Create,
} = require("./repository/credit.js");
const { GetValue, PUEWLT } = require("./repository/dictionary.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "salesdetails");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from sales_detail order by sd_id desc`;
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
      Get_DetailID(posid)
        .then((result) => {
          let data = SalesDetail(result);
          let detailid = data[0].id;
          let detail = JSON.parse(details);
          console.log(detail);
          detail.forEach((data) => {
            let items = data.items;

            items.forEach((item) => {
              console.log(`${item.name} x ${item.quantity}`);

              Get_Product(item.name)
                .then((result) => {
                  let data = Product(result);
                  let sales_inventory = [
                    [detailid, data[0].id, posid, item.quantity],
                  ];

                  InsertTable(
                    "sales_inventory",
                    sales_inventory,
                    (err, result) => {
                      if (err) console.error("Error: ", err);

                      console.log(result);
                    }
                  );
                })
                .catch((error) => {
                  return res.json({
                    msg: error,
                  });
                });
            });
            if (paymenttype == "UH POINTS") {
              CustomerCredit_Check(data.customerid)
                .then((result) => {
                  if (err) console.error("Error: ", err);

                  let balance = result[0].balance - parseFloat(data.points);
                  let creditid = result[0].id;

                  let customer_credit = [balance, data.customerid];
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
                          GetValue(PUEWLT()),
                        ],
                      ];
                      BalanceHistory_Create(balance_history)
                        .then((result) => {
                          console.log(result);
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
            }

            return res.json({
              msg: "success",
            });
          });
        })
        .catch((error) => {
          return res.json({
            msg: error,
          });
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

router.get("/getcurrentsales", (req, res) => {
  try {
    let datefrom = `${helper.GetCurrentDate()} 00:00`;
    let dateto = `${helper.GetCurrentDate()} 23:59`;
    let data = [datefrom, dateto];
    let sql = "select * from sales_detail where sd_date between ? and ?  order by sd_id desc";

    let command = helper.SelectStatement(sql, data);

    console.log(command);

    Select(command, (err, result) => {
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

router.post("/filter", (req, res) => {
  try {
    const { daterange, posid } = req.body;
    let dates = daterange.split(" to ");
    let datefrom = dates[0];
    let dateto = dates[1];
    let data = [];
    let sql = "select * from sales_detail where";

    if (datefrom != "" && dateto != "") {
      sql += ` sd_date between ? and ?`;
      data.push(datefrom);
      data.push(dateto);
    }
    if (posid != "") {
      if (daterange != "") {
        sql += " and sd_posid=?";
      } else {
        sql += " sd_posid=?";
      }

      data.push(posid);
    }

    let command = helper.SelectStatement(sql, data);

    console.log(command);

    Select(command, (err, result) => {
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


//#region Functions
function Get_Product(name) {
  return new Promise((resolve, reject) => {
    let sql = "select * from product where p_description=?";

    SelectParameter(sql, [name], (err, result) => {
      if (err) reject(err);

      console.log(result);

      resolve(result);
    });
  });
}

function Get_DetailID(posid) {
  return new Promise((resolve, reject) => {
    let sql =
      "select * from sales_detail where sd_posid = ? order by sd_id desc limit 1";
    SelectParameter(sql, [posid], (err, result) => {
      if (err) reject(err);

      console.log(result);
      resolve(result);
    });
  });
}
//#endregion
