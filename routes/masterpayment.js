var express = require("express");
var router = express.Router();

const {
  InsertTable,
  Select,
  SelectResult,
  UpdateMultiple,
} = require("./repository/soisdb.js");

const helper = require("./repository/customhelper.js");
const dictionary = require("./repository/dictionary.js");
const { MasterPayment } = require("./model/soismodel.js");
const { Validator } = require("./controller/middleware.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "masterpayment");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_payment`;
    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);

      if (result.length != 0) {
        let data = MasterPayment(result);

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
    let master_payment = [[name, createddate, createdby, status]];

    InsertTable("master_payment", master_payment, (err, result) => {
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

router.post("/status", (req, res) => {
  try {
    const { id } = req.body;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, id];
    console.log(data);

    let sql = `update master_payment 
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
    const { payment, id } = req.body;

    let data = [payment, id];
    console.log(data);
    let sql = `UPDATE master_payment 
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
