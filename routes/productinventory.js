var express = require("express");
var router = express.Router();

const {
  InsertTable,
  Select,
  SelectResult,
  UpdateMultiple,
  SelectParameter,
  Update,
} = require("./repository/soisdb.js");

const helper = require("./repository/customhelper.js");
const { ProdcutInventory } = require("./model/soismodel.js");
const { Validator } = require("./controller/middleware.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "productinventory");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select 
    pi_id,
    p_description as pi_productid,
    pi_quantity
     from product_inventory
    inner join product  on pi_productid = p_id;`;
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

router.post("/save", (req, res) => {
  try {
    const { productid, quantity } = req.body;
    let product_inventory = [];

    ProdcutInventory_Check(productid)
      .then((result) => {
        let data = ProdcutInventory(result);
        if (result.length != 0) {
          let update_quantity = data[0].quantity + parseInt(quantity);
          let update_product_inventory = [update_quantity, productid];

          console.log(update_quantity);

          let sql_update_product_inventory =
            "update product_inventory set pi_quantity=? where pi_productid=?";
          UpdateMultiple(
            sql_update_product_inventory,
            update_product_inventory,
            (err, result) => {
              if (err) console.error("Error: ", err);

              console.log(result);
            }
          );
        } else {
          product_inventory.push([productid, quantity]);
          InsertTable("product_inventory", product_inventory, (err, result) => {
            if (err) console.error("Error: ", err);

            console.log(result);
          });
        }

        res.json({
          msg: "success",
        });
      })
      .catch((error) => {});
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

function ProdcutInventory_Check(productid) {
  return new Promise((resolve, reject) => {
    let sql = "select * from product_inventory where pi_productid=?";
    SelectParameter(sql, [productid], (err, result) => {
      if (err) reject(err);

      console.log(result);

      resolve(result);
    });
  });
}
