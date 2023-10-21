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

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("masteraccess", { title: "Express" });
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_access_type`;
    Select(sql, "MasterAccessType", (err, result) => {
      if (err) console.log("Error: ", err);

      console.log(result);
      res.json({
        msg: "success",
        data: result,
      });
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
    let createdby = req.session.fullname == null ? 'TESTER' : req.session.fullname;
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
    Select(sql, "MasterAccessType", (err, result) => {
      if (err) console.log("Error: ", err);
      
      res.json({
        msg: "success",
        data: result,
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});