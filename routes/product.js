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
const { Product } = require("./model/soismodel.js");
const { Validator } = require("./controller/middleware.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "product");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from product`;
    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);
      if (result.length != 0) {
        let data = Product(result);
        // console.log(data);

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
    const { categoryid, description, barcode, image, price } = req.body;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby =
      req.session.fullname == null ? "TESTER" : req.session.fullname;
    let createddate = helper.GetCurrentDatetime();
    let product = [
      [
        categoryid,
        description,
        image,
        barcode,
        price,
        status,
        createdby,
        createddate,
      ],
    ];

    let sql = "select * from product where p_description=?";
    SelectParameter(sql, [description], (err, result) => {
      if (err) console.error("Error: ", err);

      if (result.length != 0) {
        return res.json({
          msg: "exist",
        });
      } else {
        InsertTable("product", product, (err, result) => {
          if (err) console.error("Error: ", err);

          console.log(result);
          res.json({
            msg: "success",
          });
        });
      }
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

    let sql = `update product 
                       set p_status = ?
                       where p_id = ?`;

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

router.get("/getactive", (req, res) => {
  try {
    let status = dictionary.GetValue(dictionary.ACT());
    let sql = `select * from product where p_status=?`;
    SelectParameter(sql, [status], (err, result) => {
      if (err) console.log("Error: ", err);
      if (result.length != 0) {
        let data = Product(result);
        // console.log(data);

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

router.post("/edit", (req, res) => {
  try {
    const { id, price, productimage, description } = req.body;
    let data = [];
    let sql_Update = `UPDATE product SET`;

    if (price) {
      sql_Update += ` p_price = ?,`;
      data.push(price);
    }

    if (productimage) {
      sql_Update += ` p_image = ?,`;
      data.push(productimage);
    }

    if (description) {
      sql_Update += ` p_description = ?,`;
      data.push(description);
    }

    sql_Update = sql_Update.slice(0, -1);
    sql_Update += ` WHERE p_id = ?;`;
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

router.post("/getproductinfo", (req, res) => {
  try {
    const { description } = req.body;
    let sql = "select * from product where p_description=?";

    SelectParameter(sql, [description], (err, result) => {
      if (err) console.log("Error: ", err);
      if (result.length != 0) {
        let data = Product(result);
        // console.log(data);

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

router.post("/update", (req, res) => {
  try {
    const { description, image, price, status } = req.body;
    let data = [];
    let sql_Update = `UPDATE product SET`;

    if (price) {
      sql_Update += ` p_price = ?,`;
      data.push(price);
    }

    if (image) {
      sql_Update += ` p_image = ?,`;
      data.push(image);
    }

    if (description) {
      sql_Update += ` p_description = ?,`;
      data.push(description);
    }

    if (status) {
      sql_Update += ` p_status = ?,`;
      data.push(status);
    }

    sql_Update = sql_Update.slice(0, -1);
    sql_Update += ` WHERE p_description = ?;`;
    data.push(description);

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

router.post("/addproduct", (req, res) => {
  try {
    const { description, image, price, user } = req.body;
    let status = dictionary.GetValue(dictionary.ACT());
    let createddate = helper.GetCurrentDatetime();
    let product = [
      [1007, description, image, description, price, status, user, createddate],
    ]; //1007 - NO CATEGORY

    let sql = "select * from product where p_description=?";
    SelectParameter(sql, [description], (err, result) => {
      if (err) console.error("Error: ", err);

      if (result.length != 0) {
        return res.json({
          msg: "exist",
        });
      } else {
        InsertTable("product", product, (err, result) => {
          if (err) console.error("Error: ", err);

          console.log(result);
          res.json({
            msg: "success",
          });
        });
      }
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
