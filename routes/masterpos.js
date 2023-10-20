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
  res.render("masterpos", { title: "Express" });
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_pos`;
    Select(sql, "MasterPOS", (err, result) => {
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
