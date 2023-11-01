const {
  MasterUserModel,
  MasterEmployeeModel,
  MasterAccessTypeModel,
  MasterPositionModel,
  MasterPaymentModel,
  MasterProductCategoryModel,
  MasterPOSModel,
  MasteStoreModel,
  ProductModel,
  SalesDetailModel,
  SalesItemModel,
  CustomerModel,
  CustomerOrderModel,
  RequestOrderModel,
  CustomerCreditModel,
  BalanceHistoryModel,
  ProdcutInventoryModel,
  InventoryHistoryModel,
  SalesInventoryModel,
  ItemsModel,
  UserLoginModel,
} = require("./model");
//#region Masters & Transactions Models
exports.MasterEmployee = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.me_id,
      firstname: key.me_firstname,
      middlename: key.me_middlename,
      lastname: key.me_lastname,
      position: key.me_position,
      accesstype: key.me_accesstype,
      contactno: key.me_contactno,
      datehire: key.me_datehire,
      status: key.me_status,
      createdby: key.me_createdby,
      createddate: key.me_createddate,
    });
  });

  return dataResult.map(
    (key) =>
      new MasterEmployeeModel(
        key["id"],
        key["firstname"],
        key["middlename"],
        key["lastname"],
        key["position"],
        key["accesstype"],
        key["contactno"],
        key["datehire"],
        key["status"],
        key["createdby"],
        key["createddate"]
      )
  );
};

exports.MasterAccessType = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.mat_id,
      name: key.mat_name,
      status: key.mat_status,
      createdby: key.mat_createdby,
      createddate: key.mat_createddate,
    });
  });

  return dataResult.map(
    (key) =>
      new MasterAccessTypeModel(
        key["id"],
        key["name"],
        key["status"],
        key["createdby"],
        key["createddate"]
      )
  );
};

exports.MasterPosition = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.mp_id,
      name: key.mp_name,
      status: key.mp_status,
      createdby: key.mp_createdby,
      createddate: key.mp_createddate,
    });
  });

  return dataResult.map(
    (key) =>
      new MasterPositionModel(
        key["id"],
        key["name"],
        key["status"],
        key["createdby"],
        key["createddate"]
      )
  );
};

exports.MasterPayment = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.mp_id,
      name: key.mp_name,
      status: key.mp_status,
      createdby: key.mp_createdby,
      createddate: key.mp_createddate,
    });
  });

  return dataResult.map(
    (key) =>
      new MasterPaymentModel(
        key["id"],
        key["name"],
        key["status"],
        key["createdby"],
        key["createddate"]
      )
  );
};

exports.MasterProductCategory = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.mpc_id,
      name: key.mpc_name,
      status: key.mpc_status,
      createdby: key.mpc_createdby,
      createddate: key.mpc_createddate,
    });
  });

  return dataResult.map(
    (key) =>
      new MasterProductCategoryModel(
        key["id"],
        key["name"],
        key["status"],
        key["createdby"],
        key["createddate"]
      )
  );
};

exports.MasterUser = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.mu_id,
      employeeid: key.mu_employeeid,
      fullname: key.mu_fullname,
      username: key.mu_username,
      password: key.mu_password,
      accessid: key.mu_accessid,
      status: key.mu_status,
      createdby: key.mu_createdby,
      createddate: key.mu_createddate,
    });
  });

  return dataResult.map(
    (key) =>
      new MasterUserModel(
        key["id"],
        key["employeeid"],
        key["fullname"],
        key["username"],
        key["password"],
        key["accessid"],
        key["status"],
        key["createdby"],
        key["createddate"]
      )
  );
};

exports.MasterPOS = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.mp_id,
      name: key.mp_name,
      serial: key.mp_serial,
      min: key.mp_min,
      ptu: key.mp_ptu,
      status: key.mp_status,
    });
  });

  return dataResult.map(
    (key) =>
      new MasterPOSModel(
        key["id"],
        key["name"],
        key["serial"],
        key["min"],
        key["ptu"],
        key["status"]
      )
  );
};

exports.MasterStore = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.ms_id,
      name: key.ms_name,
      logo: key.ms_logo,
      address: key.ms_address,
      contact: key.ms_contact,
      message: key.ms_message,
    });
  });

  return dataResult.map(
    (key) =>
      new MasteStoreModel(
        key["id"],
        key["name"],
        key["logo"],
        key["address"],
        key["contact"],
        key["message"]
      )
  );
};

exports.Product = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.p_id,
      categoryid: key.p_categoryid,
      description: key.p_description,
      image: key.p_image,
      barcode: key.p_barcode,
      price: key.p_price,
      status: key.p_status,
      createdby: key.p_createdby,
      createddate: key.p_createddate,
    });
  });

  return dataResult.map(
    (key) =>
      new ProductModel(
        key["id"],
        key["categoryid"],
        key["description"],
        key["image"],
        key["barcode"],
        key["price"],
        key["status"],
        key["createdby"],
        key["createddate"]
      )
  );
};

exports.SalesDetail = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.sd_id,
      posid: key.sd_posid,
      date: key.sd_date,
      cashier: key.sd_cashier,
      paymenttype: key.sd_paymenttype,
      details: key.sd_details,
      total: key.sd_total,
    });
  });

  return dataResult.map(
    (key) =>
      new SalesDetailModel(
        key["id"],
        key["posid"],
        key["date"],
        key["cashier"],
        key["paymenttype"],
        key["details"],
        key["total"]
      )
  );
};

exports.SalesItem = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.si_id,
      detailid: key.si_detailid,
      description: key.si_description,
      price: key.si_price,
      quantity: key.si_quantity,
      total: key.si_total,
    });
  });

  return dataResult.map(
    (key) =>
      new SalesItemModel(
        key["id"],
        key["detailid"],
        key["description"],
        key["price"],
        key["quantity"],
        key["total"]
      )
  );
};

exports.Customer = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.c_id,
      firstname: key.c_firstname,
      middlename: key.c_middlename,
      lastname: key.c_lastname,
      contactnumber: key.c_contactnumber,
      gender: key.c_gender,
      address: key.c_address,
      username: key.c_username,
      password: key.c_password,
      registereddate: key.c_registereddate,
    });
  });

  return dataResult.map(
    (key) =>
      new CustomerModel(
        key["id"],
        key["firstname"],
        key["middlename"],
        key["lastname"],
        key["contactnumber"],
        key["gender"],
        key["address"],
        key["username"],
        key["password"],
        key["registereddate"]
      )
  );
};

exports.CustomerOrder = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.co_id,
      customerid: key.co_customerid,
      date: key.co_date,
      details: key.co_details,
      total: key.co_total,
      paymenttype: key.co_paymenttype,
      status: key.co_status,
    });
  });

  return dataResult.map(
    (key) =>
      new CustomerOrderModel(
        key["id"],
        key["customerid"],
        key["date"],
        key["details"],
        key["total"],
        key["paymenttype"],
        key["status"]
      )
  );
};

exports.RequestOrder = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.ro_id,
      customerorderid: key.ro_customerorderid,
      date: key.ro_date,
      status: key.ro_status,
    });
  });

  return dataResult.map(
    (key) =>
      new RequestOrderModel(
        key["id"],
        key["customerorderid"],
        key["date"],
        key["status"]
      )
  );
};

exports.CustomerCredit = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.cc_id,
      customerid: key.cc_customerid,
      balance: key.cc_balance,
      status: key.cc_status,
    });
  });

  return dataResult.map(
    (key) =>
      new CustomerCreditModel(
        key["id"],
        key["customerid"],
        key["balance"],
        key["status"]
      )
  );
};

exports.BalanceHistory = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.bh_id,
      creditid: key.bh_creditid,
      date: key.bh_date,
      amount: key.bh_amount,
      type: key.bh_type,
    });
  });

  return dataResult.map(
    (key) =>
      new BalanceHistoryModel(
        key["id"],
        key["creditid"],
        key["date"],
        key["amount"],
        key["type"]
      )
  );
};

exports.ProdcutInventory = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.pi_id,
      productid: key.pi_productid,
      quantity: key.pi_quantity,
    });
  });

  return dataResult.map(
    (key) =>
      new ProdcutInventoryModel(key["id"], key["productid"], key["quantity"])
  );
};

exports.InventoryHistory = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.ih_id,
      date: key.ih_date,
      inventoryid: key.ih_inventoryid,
      productid: key.ih_productid,
      quantity: key.ih_quantity,
      type: key.ih_type,
    });
  });

  return dataResult.map(
    (key) =>
      new InventoryHistoryModel(
        key["id"],
        key["date"],
        key["inventoryid"],
        key["productid"],
        key["quantity"],
        key["type"]
      )
  );
};

exports.SalesInventory = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.si_id,
      detailid: key.si_detailid,
      productid: key.si_productid,
      posid: key.si_posid,
    });
  });

  return dataResult.map(
    (key) =>
      new SalesInventoryModel(
        key["id"],
        key["detailid"],
        key["productid"],
        key["posid"]
      )
  );
};

exports.Items = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.si_id,
      detailid: key.si_detailid,
      productid: key.si_productid,
      posid: key.si_posid,
    });
  });

  return dataResult.map(
    (key) => new ItemsModel(key["id"], key["detailid"], key["productid"])
  );
};
//#endregion

//#region Custom Models

exports.UserLogin = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      employeeid: key.employeeid,
      fullname: key.fullname,
      accesstype: key.accesstype,
      position: key.position,
    });
  });

  return dataResult.map(
    (key) =>
      new UserLoginModel(
        key["employeeid"],
        key["fullname"],
        key["accesstype"],
        key["position"]
      )
  );
};
//#endregion
