var express = require("express");
var router = express.Router();

const {
  InsertTable,
  Select,
  SelectResult,
  UpdateMultiple,
} = require("./repository/soisdb.js");

const helper = require("./repository/customhelper.js");
const {
  SalesInventory,
  SalesProductInventory,
} = require("./model/soismodel.js");
const { Validator } = require("./controller/middleware.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "salesinventory");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select
                si_id as salesid,
                si_detailid as detailid,
                p_description as productname,
                si_posid as posid,
                si_quantity as quantity
                from sales_inventory
                inner join product on si_productid = p_id
                order by si_id;`;

    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);
      if (result.length != 0) {
        let data = SalesProductInventory(result);
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
