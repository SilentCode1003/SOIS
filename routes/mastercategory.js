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
const { MasterProductCategory } = require("./model/soismodel.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("mastercategory", { title: "Express" });
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_product_category`;
    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);
      if (result.length != 0) {
        let data = MasterProductCategory(result);
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
    let master_product_category = [[name, status, createdby, createddate]];

    InsertTable(
      "master_product_category",
      master_product_category,
      (err, result) => {
        if (err) console.error("Error: ", err);

        console.log(result);

        res.json({
          msg: "success",
        });
      }
    );
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.get("/getactive", (req, res) => {
  try {
    let status = disctionary.GetValue(disctionary.ACT());
    let condition = [status];
    let sql = `select * from master_product_category where mpc_status=?`;

    SelectParameter(sql, condition, (err, result) => {
      if (err) console.error("Error: ", err);

      let data = MasterProductCategory(result);
      console.log(data);

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
