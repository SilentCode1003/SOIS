var express = require("express");
var router = express.Router();

const {
  InsertTable,
  Select,
  SelectResult,
  UpdateMultiple,
} = require("./repository/soisdb.js");

const helper = require("./repository/customhelper.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("customer", { title: "Express" });
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from customer`;
    Select(sql, "Customer", (err, result) => {
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
    const { firstname, middlename, lastname, contactnumber, gender, address } =
      req.body;
    let registereddate = helper.GetCurrentDatetime();
    let customer = [
      [
        firstname,
        middlename,
        lastname,
        contactnumber,
        gender,
        address,
        registereddate,
      ],
    ];

    InsertTable("customer", customer, (err, result) => {
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
