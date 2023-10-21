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
const { MasterEmployee } = require("./model/soismodel.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("masteremployee", { title: "Express" });
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_employee`;
    Select(sql, (err, result) => {
      if (err) console.error("Error: ", err);
      if (result.length != 0) {
        let data = MasterEmployee(result);

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
    const {
      firstname,
      middlename,
      lastname,
      position,
      accesstype,
      contactno,
      datehire,
    } = req.body;
    let status = disctionary.GetValue(disctionary.ACT());
    let createdby =
      req.session.fullname == null ? "TESTER" : req.session.fullname;
    let createddate = helper.GetCurrentDatetime();
    let master_employee = [
      [
        firstname,
        middlename,
        lastname,
        position,
        accesstype,
        contactno,
        datehire,
        status,
        createdby,
        createddate,
      ],
    ];

    InsertTable("master_employee", master_employee, (err, result) => {
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
