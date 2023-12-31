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
const dictionary = require("./repository/dictionary.js");
const { MasterRating } = require("./model/soismodel.js");
const { Validator } = require("./controller/middleware.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "masterrating");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_rating`;

    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);
      if (result.length != 0) {
        let data = MasterRating(result);
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
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby =
      req.session.fullname == null ? "TESTER" : req.session.fullname;
    let createddate = helper.GetCurrentDatetime();
    let master_rating = [[name, status, createdby, createddate]];

    InsertTable("master_rating", master_rating, (err, result) => {
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

router.post("/getname", (req, res) => {
  try {
    const { id } = req.body;
    let sql = `select mr_description from master_rating where mr_id = '${id}'`;

    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);
      let data = MasterRating(result);

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

router.post("/status", (req, res) => {
  try {
    const { id } = req.body;
    let status =
      req.body.status == dictionary.GetValue(dictionary.ACT())
        ? dictionary.GetValue(dictionary.INACT())
        : dictionary.GetValue(dictionary.ACT());
    let data = [status, id];
    console.log(data);

    let sql = `update master_rating 
                       set mr_status = ?
                       where mr_id = ?`;

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
    const { rating, id } = req.body;

    let data = [rating, id];
    console.log(data);
    let sql = `UPDATE master_rating 
                       SET mr_description = ?
                       WHERE mr_id = ?`;

    UpdateMultiple(sql, data, (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);

      // let loglevel = dictionary.INF();
      // let source = dictionary.MSTR();
      // let message = `${dictionary.GetValue(dictionary.UPDT())} -  [${sql}]`;
      // let user = req.session.emrloyeeid;

      // Logger(loglevel, source, message, user);
    });

    res.json({
      msg: "success",
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.get("/getactive", (req, res) => {
  try {
    let status = dictionary.GetValue(dictionary.ACT());
    let sql = "select * from master_rating where mr_status=?";

    SelectParameter(sql, [status], (err, result) => {
      if (result.length != 0) {
        let data = MasterRating(result);
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
