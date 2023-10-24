var express = require('express');
var router = express.Router();

const {
  InsertTable,
  Select,
  SelectResult,
  UpdateMultiple,
} = require("./repository/soisdb.js");

const helper = require("./repository/customhelper.js");
const { ProdcutInventory } = require('./model/soismodel.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('productinventory', { title: 'Express' });
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from product_inventory`;
    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);

      if (result.length != 0) {
        let data = ProdcutInventory(result);
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