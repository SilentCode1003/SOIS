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
const { Customer } = require("./model/soismodel.js");
const { Encrypter } = require("./repository/cryptography.js");
const { Validator } = require("./controller/middleware.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "customer");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from customer`;
    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);
      if (result.length != 0) {
        let data = Customer(result);
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
    const {
      firstname,
      middlename,
      lastname,
      contactnumber,
      gender,
      address,
      username,
      password,
    } = req.body;
    let registereddate = helper.GetCurrentDatetime();
    Encrypter(password, (err, encrypted) => {
      if (err) console.error("Error: ", err);

      let customer = [
        [
          firstname,
          middlename,
          lastname,
          contactnumber,
          gender,
          address,
          username,
          encrypted,
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
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;
    let sql = "select * from customer where c_username=? and c_password=?";

    Encrypter(password, (err, encrytped) => {
      if (err) console.error("Error: ", err);

      console.log(encrytped);
      let data = [username, encrytped];
      Select(helper.SelectStatement(sql, data), (err, result) => {
        if (err) console.error("Error: ", err);

        if (result.length != 0) {
          let data = Customer(result);
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
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
