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

  return dataResult;
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

  return dataResult;
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

  return dataResult;
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

  return dataResult;
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

  return dataResult;
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

  return dataResult;
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

  return dataResult;
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

  return dataResult;
};

exports.Product = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.p_id,
      categoryid: key.p_categoryid,
      description: key.p_description,
      barcode: key.p_barcode,
      price: key.p_price,
      status: key.p_status,
      createdby: key.p_createdby,
      createddate: key.p_createddate,
    });
  });

  return dataResult;
};

exports.SalesDetail = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.sd_id,
      date: key.sd_date,
      cashier: key.sd_cashier,
      paymenttype: key.sd_paymenttype,
      details: key.sd_details,
      total: key.sd_total,
    });
  });

  return dataResult;
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

  return dataResult;
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
      registereddate: key.c_registereddate,
    });
  });

  return dataResult;
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

  return dataResult;
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

  return dataResult;
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

  return dataResult;
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

  return dataResult;
};

exports.ProdcutInventory = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      id: key.pi_id,
      productid: key.ppi_productid,
      quantity: key.ppi_quantity,
    });
  });

  return dataResult;
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

  return dataResult;
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

  return dataResult;
};
