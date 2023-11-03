const { CustomerCredit } = require("../model/soismodel");
const { SelectParameter, InsertTable } = require("./soisdb");

exports.CustomerCredit_Check = (data) => {
  return new Promise((resolve, reject) => {
    let sql = "select * from customer_credit where cc_customerid=?";
    SelectParameter(sql, [data], (err, result) => {
      if (err) reject(err);

      console.log(result);

      let credit = CustomerCredit(result);
      resolve(credit);
    });
  });
};

exports.BalanceHistory_Create = (data) => {
  return new Promise((resolve, reject) => {
    InsertTable("balance_history", data, (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      console.log(result);
      resolve(result);
    });
  });
};
