var express = require("express");
var router = express.Router();
const pdfmake = require("pdfmake");
const fs = require("fs");
const path = require("path");

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
  MasterPosition,
  SalesDetail,
  Items,
  ItemDetails,
  ItemInfo,
} = require("./model/soismodel.js");
const { Validator } = require("./controller/middleware.js");
const { Generate } = require("./repository/pdf.js");
const { ItemInfoModel } = require("./model/model.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "reports");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let datefrom = helper.GetCurrentDate();
    let dateto = helper.GetCurrentDate();
    let sql = `select * from sales_detail
    where sd_date between '${datefrom} 00:00' and '${dateto} 23:59'`;

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
    const { name } = req.body;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby =
      req.session.fullname == null ? "TESTER" : req.session.fullname;
    let createddate = helper.GetCurrentDatetime();
    let master_position = [[name, status, createdby, createddate]];

    InsertTable("master_position", master_position, (err, result) => {
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

router.post("/getname", (req, res) => {
  try {
    const { id } = req.body;
    let sql = `select mp_name from master_position where mp_id = '${id}'`;

    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);
      let data = MasterPosition(result);

      console.log(data);

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

router.post("/status", (req, res) => {
  try {
    const { id } = req.body;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, id];
    console.log(data);

    let sql = `update master_position 
                       set mp_status = ?
                       where mp_id = ?`;

    UpdateMultiple(sql, data, (err, result) => {
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

router.post("/edit", (req, res) => {
  try {
    const { position, id } = req.body;

    let data = [position, id];
    console.log(data);
    let sql = `UPDATE master_position 
                       SET mp_name = ?
                       WHERE mp_id = ?`;

    UpdateMultiple(sql, data, (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);

      // let loglevel = dictionary.INF();
      // let source = dictionary.MSTR();
      // let message = `${dictionary.GetValue(dictionary.UPDT())} -  [${sql}]`;
      // let user = req.session.employeeid;

      // Logger(loglevel, source, message, user);
    });

    res.json({
      msg: "success",
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

let pdfBuffer = "";
router.post("/pdf", (req, res) => {
  try {
    const { daterange, posid } = req.body;

    console.log(req.body);
    let dates = daterange.split(" to ");
    let datefrom = dates[0] + " 00:00";
    let dateto = dates[1] + " 23:59";
    // let datefrom = "2024-01-02";
    // let dateto = "2024-01-02";

    // console.log(datefrom, dateto);

    let sql = `select * from sales_detail where sd_date between ? and ? and sd_posid=?`;
    let command = helper.SelectStatement(sql, [datefrom, dateto, posid]);

    // console.log(command);

    Select(command, (err, result) => {
      if (err) console.error("Error: ", err);

      if (result.length != 0) {
        let sales_details = SalesDetail(result);
        let data = [];
        let datalength = sales_details.length;
        let couter = 0;
        sales_details.forEach((details) => {
          couter += 1;
          let items = ItemDetails(JSON.parse(details.details));
          items.forEach((item) => {
            let salesifo = ItemInfo(item.items);

            salesifo.forEach((info) => {
              // console.log(info.name);
              data.push(
                new ItemInfoModel(info.name, info.price, info.quantity)
              );

              if (couter == datalength) {
                let data_summary = ItemInfo(data);

                let summary = [];

                let summary_length = 0;
                data_summary.forEach((product) => {
                  summary_length += 1;
                  let index = summary.findIndex((i) => i.name === product.name);
                  if (index !== -1) {
                    summary[index].quantity =
                      summary[index].quantity + product.quantity;
                  } else {
                    summary.push({
                      name: product.name,
                      price: product.price,
                      quantity: product.quantity,
                    });
                  }

                  if (summary_length == data_summary.length) {
                    Generate(summary)
                      .then((result) => {
                        // console.log(result);

                        pdfBuffer = result;

                        res.json({
                          msg: "success",
                        });
                      })
                      .catch((error) => {
                        return res.json({
                          msg: error,
                        });
                      });
                  }
                });

                // console.log("Complete!");
              }
            });
          });
        });
      } else {
        return res.json({
          msg: "No Data",
        });
      }
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.get("/generatepdf", (req, res) => {
  try {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Sales_Report.pdf"
    );

    res.send(pdfBuffer);
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
