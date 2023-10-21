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
  res.render("masterposition", { title: "Express" });
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_position`;

    Select(sql, "MasterPosition", (err, result) => {
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

    Select(sql, "MasterPosition", (err, result) => {
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