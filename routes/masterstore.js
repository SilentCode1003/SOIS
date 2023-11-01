var express = require("express");
var router = express.Router();

const {
  InsertTable,
  Select,
  SelectResult,
  UpdateMultiple,
  SelectParameter,
} = require("./repository/soisdb.js");
const { MasterStore } = require("./model/soismodel.js");
const { Validator } = require("./controller/middleware.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "masterstore");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_store`;
    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);
      if (result.length != 0) {
        let data = MasterStore(result);
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
    const { name, logo, address, contact, message } = req.body;
    let master_store = [[name, logo, address, contact, message]];

    console.log(name, logo, address, contact, message);

    InsertTable("master_store", master_store, (err, result) => {
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

router.post("/getstore", (req, res) => {
  try {
    const { storeid } = req.body;
    let sql = "select * from master_store where ms_id=?";

    SelectParameter(sql, [storeid], (err, result) => {
      if (err) console.error("Error: ", err);
      if (result.length != 0) {
        let data = MasterStore(result);
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
