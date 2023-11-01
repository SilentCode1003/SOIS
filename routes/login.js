var express = require("express");
var router = express.Router();

const {
  Select,
  SelectResult,
  SelectParameter,
} = require("./repository/soisdb.js");

const { SelectStatement } = require("./repository/customhelper.js");

const { MasterUserModel, UserLoginModel } = require("./model/model.js");

const helper = require("./repository/customhelper.js");
const disctionary = require("./repository/dictionary.js");
const crypto = require("./repository/cryptography.js");
const { MasterUser, UserLogin } = require("./model/soismodel.js");

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
        `select 
        mu_employeeid as employeeid,
        mu_fullname as fullname,
        mat_name as accesstype,
        mp_name as position
        from master_user
        inner join master_access_type on mu_accessid = mat_id
        left join master_employee on mu_employeeid = me_id
        left join master_position on me_position = mp_id where mu_username=? and mu_password=?`,
        condition
      );

      SelectParameter(statement, condition, (err, result) => {
        if (err) console.error("Error: ", err);
        if (result.length != 0) {
          let data = UserLogin(result);

          console.log(result);

          data.forEach((user) => {
            req.session.userid = user.employeeid;
            req.session.fullname = user.fullname;
            req.session.accesstype = user.accesstype;
            req.session.position = user.position;
          });

          return res.json({
            msg: "success",
            data: data,
          });
        } else {
          return res.json({
            msg: "incorrect",
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


router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.json({
        msg: err,
      });
    }

    res.json({
      msg: "success",
    });
  });
});