var express = require('express');
var router = express.Router();

const {
  InsertTable,
  Select,
  SelectResult,
  UpdateMultiple,
} = require("./repository/soisdb.js");

const helper = require("./repository/customhelper.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('requestorder', { title: 'Express' });
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from request_order`;
    Select(sql, "RequestOrder", (err, result) => {
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