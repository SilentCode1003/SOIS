var express = require("express");
var router = express.Router();

const {
  InsertTable,
  Select,
  SelectResult,
  UpdateMultiple,
} = require("./repository/soisdb.js");

const helper = require("./repository/customhelper.js");
const { InventoryHistory } = require("./model/soismodel.js");
const { Validator } = require("./controller/middleware.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "inventoryhistory");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select 
    ih_id,
    ih_date,
    ih_inventoryid,
    p_description as ih_productid,
    ih_quantity,
    ih_type 
    from inventory_history
    inner join product on ih_productid = p_id;`;
    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);
      if (result.length != 0) {
        let data = InventoryHistory(result);
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
    const { invetoryid, productid, quantity, type } = req.body;
    let date = helper.GetCurrentDatetime();
    let inventory_history = [[date, invetoryid, productid, quantity, type]];

    InsertTable("inventory_history", inventory_history, (err, result) => {
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
