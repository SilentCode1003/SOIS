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
const disctionary = require("./repository/dictionary.js");
const { MasterAccessType } = require("./model/soismodel.js");
const { Validator } = require("./controller/middleware.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "masteraccess");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_access_type`;
    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);
      if (result.length != 0) {
        let data = MasterAccessType(result);
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
    let status = disctionary.GetValue(disctionary.ACT());
    let createdby =
      req.session.fullname == null ? "TESTER" : req.session.fullname;
    let createddate = helper.GetCurrentDatetime();
    let master_access_type = [[name, status, createdby, createddate]];

    InsertTable("master_access_type", master_access_type, (err, result) => {
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
    let sql = `select mat_name from master_access_type where mat_id = '${id}'`;
    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);
      let data = MasterAccessType(result);

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
