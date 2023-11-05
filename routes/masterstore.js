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
    const { name, logo, address, contact, messages } = req.body;
    let master_store = [[name, logo, address, contact, messages]];

    console.log(name, logo, address, contact, messages);

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

router.post("/edit", (req, res) => {
  try {
    const { id, address, contact, messages } = req.body;
    let data = [];
    let sql_Update = `UPDATE master_store SET`;

    console.log(`${id} ${address} ${contact} ${messages}`);

    if (address) {
      sql_Update += ` ms_address = ?,`;
      data.push(address);
    }

    if (contact) {
      sql_Update += ` ms_contact = ?,`;
      data.push(contact);
    }

    if (messages) {
      sql_Update += ` ms_message = ?,`;
      data.push(messages);
    }

    sql_Update = sql_Update.slice(0, -1);
    sql_Update += ` WHERE ms_id = ?;`;
    data.push(id);

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

function MasterStore_Check(id) {
  return new Promise((resolve, reject) => {
    let sql = "select  * from master_store where ms_id=?";
    SelectParameter(sql, [id], (err, result) => {
      if (err) reject(err);
      console.log(result);

      resolve(result);
    });
  });
}
