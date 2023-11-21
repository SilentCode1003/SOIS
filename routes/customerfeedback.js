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
const { CustomerFeedback, MasterRating } = require("./model/soismodel.js");
const { Validator } = require("./controller/middleware.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  Validator(req, res, "customerfeedback");
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select
    cf_id,
    cf_orderid,
    mr_description as cf_ratingid,
    cf_message
    from customer_feedback
    inner join master_rating on cf_ratingid = mr_id;`;

    Select(sql, (err, result) => {
      if (err) console.log("Error: ", err);
      if (result.length != 0) {
        let data = CustomerFeedback(result);
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

router.post("/feedback", (req, res) => {
  try {
    const { orderid, rating, message } = req.body;

    console.log(orderid, rating, message);

    Get_MasterRating(rating, (err, result) => {
      if (err) console.error("Error: ", err);

      if (result.length != 0) {
        let data = MasterRating(result);
        console.log(data);

        let customer_feedback = [[orderid, data[0].id, message]];
        InsertTable("customer_feedback", customer_feedback, (err, result) => {
          if (err) console.log("Error: ", err);

          console.log(result);
          res.json({
            msg: "success",
          });
        });
      } else {
        res.json({
          msg: "notexist",
        });
      }
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

// router.post("/getfeedback", (req, res) => {
//   try {
//     const { customerid } = req.body;
//   } catch (error) {
//     res.json({
//       msg: error,
//     });
//   }
// });

function Get_MasterRating(description, callback) {
  let sql = "select * from master_rating where mr_description=?";
  SelectParameter(sql, [description], (err, result) => {
    if (err) callback(err, null);
    console.log(result);

    callback(null, result);
  });
}
