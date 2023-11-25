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
    let sql = `select * from master_position`;

    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);
      if (result.length != 0) {
        let data = MasterPosition(result);
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

router.get("/pdf", (req, res) => {
  try {
    let sql = `select * from sales_detail
    where sd_date between '2023-11-01 00:00' and '2023-11-30 23:59'`;

    Select(sql, (err, result) => {
      if (err) console.error("Error: ", err);
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
            console.log(info.name);
            data.push(new ItemInfoModel(info.name, info.price, info.quantity));

            if (couter == datalength) {
              let data_summary = ItemInfo(data);

              let summary = [];

              data_summary.forEach((product) => {
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
                console.log(summary);
              });

              
              console.log("Complete!");
            }
          });
        });
      });
    });
    // Generate((err, result) => {
    //   if (err) console.error("Error: ", err);
    //   console.log(result);

    //   res.setHeader("Content-Type", "application/pdf");
    //   res.setHeader(
    //     "Content-Disposition",
    //     `attachment; filename=Sales_Report_${helper.GetCurrentDate()}.pdf`
    //   );
    //   res.send(result);

    //   // const pdfStream = fs.createReadStream(result);
    //   // pdfStream.pipe(res);
    // });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
