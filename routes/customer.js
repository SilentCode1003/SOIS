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
const { GetValue, ACT } = require("./repository/dictionary.js");

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

      let data = [firstname, middlename, lastname, username];

      Customer_Check(data)
        .then((result) => {
          if (result.length != 0) {
            return res.json({
              msg: "exist",
            });
          } else {
            InsertTable("customer", customer, (err, result) => {
              if (err) console.error("Error: ", err);

              console.log(result);

              let customer_credit = [[result[0].id, 0, GetValue(ACT())]];

              console.log(customer_credit);

              CustomerCredit_Create(customer_credit)
                .then((result) => {
                  console.log(result);
                })
                .catch((error) => {
                  res.json({
                    msg: error,
                  });
                });

              res.json({
                msg: "success",
              });
            });
          }
        })
        .catch((error) => {
          res.json({
            msg: error,
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

//#region
function Customer_Check(data) {
  return new Promise((resolve, reject) => {
    let sql =
      "select * from customer where c_firstname=? and c_middlename=? and c_lastname=? or c_username=?";
    let command = helper.SelectStatement(sql, data);
    console.log(command);

    SelectParameter(command, data, (err, result) => {
      if (err) reject(result);

      console.log(result);
      resolve(result);
    });
  });
}

function CustomerCredit_Create(data) {
  return new Promise((resolve, reject) => {
    InsertTable("customer_credit", data, (err, result) => {
      if (err) reject(err);
      console.log(result);

      resolve(result);
    });
  });
}
//#endregion
