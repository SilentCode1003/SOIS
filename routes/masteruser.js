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
const crypto = require("./repository/cryptography.js");
const { MasterUser } = require("./model/soismodel.js");
const { Validator } = require("./controller/middleware.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "masteruser");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_user`;
    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);

      if (result.length != 0) {
        let data = MasterUser(result);
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
    const { employeeid, fullname, username, password, accessid } = req.body;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby =
      req.session.fullname == null ? "TESTER" : req.session.fullname;
    let createddate = helper.GetCurrentDatetime();
    crypto.Encrypter(password, (err, encrypter) => {
      if (err) console.error("Error: ", err);
      let master_user = [
        [
          employeeid,
          fullname,
          username,
          encrypter,
          accessid,
          status,
          createdby,
          createddate,
        ],
      ];

      InsertTable("master_user", master_user, (err, result) => {
        if (err) console.error("Error: ", err);

        console.log(result);

        res.json({
          msg: "success",
        });
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

    let sql = `update master_user 
                       set mu_status = ?
                       where mu_id = ?`;

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
    const { employeeid, username, password, accessid } = req.body;
    let data = [];
    let sql_Update = `UPDATE master_user SET`;

    crypto.Encrypter(password, (err, encryted) => {
      if (err) console.error("Error: ", err);

      if (username) {
        sql_Update += ` mu_username = ?,`;
        data.push(username);
      }

      if (password) {
        sql_Update += ` mu_password = ?,`;

        data.push(encryted);
      }

      if (accessid) {
        sql_Update += ` mu_accessid = ?,`;
        data.push(accessid);
      }
      sql_Update = sql_Update.slice(0, -1);
      sql_Update += ` WHERE mu_id = ?;`;
      data.push(employeeid);

      console.log(`${sql_Update} ${data}`);

      UpdateMultiple(sql_Update, data, (err, result) => {
        if (err) console.error("Error: ", err);
        console.log(result);

        res.json({
          msg: "success",
        });
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
