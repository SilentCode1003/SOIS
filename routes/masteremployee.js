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
const { MasterEmployee } = require("./model/soismodel.js");
const { Validator } = require("./controller/middleware.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "masteremployee");
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
    let status = dictionary.GetValue(dictionary.ACT());
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

router.post("/status", (req, res) => {
  try {
    const { employeeid } = req.body;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, employeeid];
    console.log(data);

    let sql = `update master_employee 
                       set me_status = ?
                       where me_id = ?`;

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
    const {
      employeeid,
      firstname,
      middlename,
      lastname,
      position,
      accesstype,
      contactno,
    } = req.body;
    let data = [];
    let sql_Update = `UPDATE master_employee SET`;

    if (firstname) {
      sql_Update += ` me_firstname = ?,`;
      data.push(firstname);
    }

    if (middlename) {
      sql_Update += ` me_middlename = ?,`;
      data.push(middlename);
    }

    if (lastname) {
      sql_Update += ` me_lastname = ?,`;
      data.push(lastname);
    }
    if (position) {
      sql_Update += ` me_position = ?,`;
      data.push(position);
    }

    if (accesstype) {
      sql_Update += ` me_accesstype = ?,`;
      data.push(accesstype);
    }

    if (contactno) {
      sql_Update += ` me_contactno = ?,`;
      data.push(contactno);
    }

    sql_Update = sql_Update.slice(0, -1);
    sql_Update += ` WHERE me_id = ?;`;
    data.push(employeeid);

    console.log(`${sql_Update} ${data}`);

    UpdateMultiple(sql_Update, data, (err, result) => {
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
