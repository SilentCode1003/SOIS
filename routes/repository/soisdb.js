const mysql = require("mysql");
const model = require("../model/soismodel");
require("dotenv").config();
const crypt = require("./cryptography");

let password = "";
crypt.Decrypter(process.env._PASSWORD, (err, result) => {
  if (err) throw err;

  password = result;
  console.log(`${result}`);
});

const connection = mysql.createConnection({
  host: process.env._HOST,
  user: process.env._USER,
  password: password,
  database: process.env._DATABASE,
});

// crypt.Encrypter("#Ebedaf19dd0d", (err, result) => {
//   if (err) console.error("Error: ", err);

//   console.log(result);
// });

// crypt.Decrypter('f6a3287039d0d75cb83cb29d35b3dfcb', (err, result) => {
//     if (err) console.error('Error: ', err);

//     console.log(${result});
// });

exports.CheckConnection = () => {
  connection.connect((err) => {
    if (err) {
      console.error("Error connection to MYSQL databases: ", err);
      return;
    }
    console.log("MySQL database connection established successfully!");
  });
};

exports.CheckConnection = () => {
  connection.connect((err) => {
    if (err) {
      console.error("Error connection to MYSQL databases: ", err);
      return;
    }
    console.log("MySQL database connection established successfully!");
  });
};

exports.InsertMultiple = async (stmt, todos) => {
  try {
    connection.connect((err) => {
      return err;
    });
    // console.log(statement: ${stmt} data: ${todos});

    connection.query(stmt, [todos], (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row inserted: ${results.affectedRows}`);

      return 1;
    });
  } catch (error) {
    console.log(error);
  }
};

exports.Select = (sql, table, callback) => {
  try {
    connection.connect((err) => {
      return err;
    });
    connection.query(sql, (error, results, fields) => {
      // console.log(results);

      if (error) {
        callback(error, null);
      }

      if (table == "MasterEmployee") {
        callback(null, model.MasterEmployee(results));
      }

      if (table == "MasterAccessType") {
        callback(null, model.MasterAccessType(results));
      }

      if (table == "MasterPosition") {
        callback(null, model.MasterPosition(results));
      }

      if (table == "MasterPayment") {
        callback(null, model.MasterPayment(results));
      }

      if (table == "MasterProductCategory") {
        callback(null, model.MasterProductCategory(results));
      }

      if (table == "MasterUser") {
        callback(null, model.MasterUser(results));
      }

      if (table == "MasterPOS") {
        callback(null, model.MasterPOS(results));
      }

      if (table == "MasterStore") {
        callback(null, model.MasterStore(results));
      }

      if (table == "BalanceHistory") {
        callback(null, model.BalanceHistory(results));
      }

      if (table == "Customer") {
        callback(null, model.Customer(results));
      }

      if (table == "CustomerCredit") {
        callback(null, model.CustomerCredit(results));
      }

      if (table == "CustomerOrder") {
        callback(null, model.CustomerOrder(results));
      }

      if (table == "InventoryHistory") {
        callback(null, model.InventoryHistory(results));
      }

      if (table == "Product") {
        callback(null, model.Product(results));
      }

      if (table == "ProdcutInventory") {
        callback(null, model.ProdcutInventory(results));
      }

      if (table == "RequestOrder") {
        callback(null, model.RequestOrder(results));
      }

      if (table == "SalesDetail") {
        callback(null, model.SalesDetail(results));
      }

      if (table == "SalesItem") {
        callback(null, model.SalesItem(results));
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.StoredProcedure = (sql, data, callback) => {
  try {
    connection.query(sql, data, (error, results, fields) => {
      if (error) {
        callback(error.message, null);
      }
      callback(null, results[0]);
    });
  } catch (error) {
    callback(error, null);
  }
};

exports.StoredProcedureResult = (sql, callback) => {
  try {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        callback(error.message, null);
      }
      callback(null, results[0]);
    });
  } catch (error) {
    callback(error, null);
  }
};

exports.Update = async (sql, callback) => {
  try {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        callback(error, null);
      }
      // console.log('Rows affected:', results.affectedRows);

      callback(null, `Rows affected: ${results.affectedRows}`);
    });
  } catch (error) {
    callback(error, null);
  }
};

exports.UpdateMultiple = async (sql, data, callback) => {
  try {
    connection.query(sql, data, (error, results, fields) => {
      if (error) {
        callback(error, null);
      }
      console.log("Rows affected:", results.affectedRows);

      callback(null, `Rows affected: ${results.affectedRows}`);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.CloseConnect = () => {
  connection.end();
};

exports.Insert = (stmt, todos, callback) => {
  try {
    connection.connect((err) => {
      return err;
    });
    // console.log(statement: ${stmt} data: ${todos});

    connection.query(stmt, [todos], (err, results, fields) => {
      if (err) {
        callback(err, null);
      }
      // callback(null, Row inserted: ${results});
      let data = [
        {
          rows: results.affectedRows,
          id: results.insertId,
        },
      ];
      callback(null, data);
      // console.log(Row inserted: ${results.affectedRows});
    });
  } catch (error) {
    callback(error, null);
  }
};

exports.SelectResult = (sql, callback) => {
  try {
    connection.connect((err) => {
      return err;
    });
    connection.query(sql, (error, results, fields) => {
      // console.log(results);

      if (error) {
        callback(error, null);
      }

      callback(null, results);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.Delete = (sql, id, callback) => {
  try {
    connection.connect((err) => {
      return err;
    });
    connection.query(sql, id, (error, results, fields) => {
      console.log(results);

      if (error) {
        callback(error, null);
      }

      callback(null, results);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.InsertTable = (tablename, data, callback) => {
  if (tablename == "master_employee") {
    let sql = `INSERT INTO master_employee(
        me_firstname,
        me_middlename,
        me_lastname,
        me_position,
        me_accesstype,
        me_contactno,
        me_datehire,
        me_status,
        me_createdby,
        me_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_access_type") {
    let sql = `INSERT INTO master_access_type(
        mat_name,
        mat_status,
        mat_createdby,
        mat_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_position") {
    let sql = `INSERT INTO master_position(
        mp_name,
        mp_status,
        mp_createdby,
        mp_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_payment") {
    let sql = `INSERT INTO master_payment(
        mp_name,
        mp_createddate,
        mp_createdby,
        mp_status) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_product_category") {
    let sql = `INSERT INTO master_product_category(
        mpc_name,
        mpc_status,
        mpc_createdby,
        mpc_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_user") {
    let sql = `INSERT INTO master_user(
        mu_employeeid,
        mu_fullname,
        mu_username,
        mu_password,
        mu_accessid,
        mu_status,
        mu_createdby,
        mu_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_pos") {
    let sql = `INSERT INTO master_pos(
        mp_name,
        mp_serial,
        mp_min,
        mp_ptu,
        mp_status) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_user") {
    let sql = `INSERT INTO master_user(
        ms_name,
        ms_logo,
        ms_address,
        ms_contact,
        ms_message) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "product") {
    let sql = `INSERT INTO product(
      p_categoryid,
      p_description,
      p_barcode,
      p_price,
      p_status,
      p_createdby,
      p_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "sales_detail") {
    let sql = `INSERT INTO sales_detail(
      sd_date,
      sd_cashier,
      sd_paymenttype,
      sd_details,
      sd_total) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "sales_item") {
    let sql = `INSERT INTO sales_item(
      si_detailid,
      si_description,
      si_price,
      si_quantity,
      si_total) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "customer") {
    let sql = `INSERT INTO customer(
      c_firstname,
      c_middlename,
      c_lastname,
      c_contactnumber,
      c_gender,
      c_address,
      c_registereddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "customer_order") {
    let sql = `INSERT INTO customer_order(
      co_customerid,
      co_date,
      co_details,
      co_total,
      co_paymenttype,
      co_status) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "request_order") {
    let sql = `INSERT INTO request_order(
      ro_customerorderid,
      ro_date,
      ro_status) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "customer_credit") {
    let sql = `INSERT INTO customer_credit(
      cc_customerid,
      cc_balance,
      cc_status) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "balance_history") {
    let sql = `INSERT INTO balance_history(
      bh_creditid,
      bh_date,
      bh_amount,
      bh_type) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "product_inventory") {
    let sql = `INSERT INTO product_inventory(
      pi_productid,
      pi_quantity) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "inventory_history") {
    let sql = `INSERT INTO inventory_history(
      ih_date,
      ih_inventoryid,
      ih_productid,
      ih_quantity,
      ih_type) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "sales_inventory") {
    let sql = `INSERT INTO sales_inventory(
      si_detailid,
      si_productid,
      si_posid) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }
};