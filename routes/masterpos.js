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
const { MasterPOS } = require("./model/soismodel.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("masterpos", { title: "Express" });
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_pos`;
    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);
      if (result.length != 0) {
        let data = MasterPOS(result);
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
    const { name, serial, min, ptu } = req.body;
    let status = disctionary.GetValue(disctionary.ACT());
    let master_pos = [[name, serial, min, ptu, status]];

    InsertTable("master_pos", master_pos, (err, result) => {
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

router.post("/getpos", (req, res) => {
  try {
    const { posid } = req.body;
    let sql = "select * from master_pos where mp_id=?";

    SelectParameter(sql, [posid], (err, result) => {
      if (err) console.error("Error: ", err);

      if (result.length != 0) {
        let data = MasterPOS(result);
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
