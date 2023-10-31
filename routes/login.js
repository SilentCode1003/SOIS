var express = require("express");
var router = express.Router();

const {
  Select,
  SelectResult,
  SelectParameter,
} = require("./repository/soisdb.js");

const { SelectStatement } = require("./repository/customhelper.js");

const { MasterUserModel } = require("./model/model.js");

const helper = require("./repository/customhelper.js");
const disctionary = require("./repository/dictionary.js");
const crypto = require("./repository/cryptography.js");
const { MasterUser } = require("./model/soismodel.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login", { title: "Express" });
});

module.exports = router;

router.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;

    crypto.Encrypter(password, (err, encrypted) => {
      if (err) console.error("Error: ", err);

      console.log(encrypted);

      let condition = [username, encrypted];
      let statement = SelectStatement(
        "select * from master_user where mu_username=? and mu_password=?",
        condition
      );

      SelectParameter(statement, condition, (err, result) => {
        if (err) console.error("Error: ", err);
        if (result.length != 0) {
          let data = MasterUser(result);

          console.log(result);

          return res.json({
            msg: "success",
            data: data,
          });
        } else {
          return res.json({
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
