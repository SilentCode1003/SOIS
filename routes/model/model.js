//#region Master & Transaction Model
class MasterUserModel {
  constructor(
    id,
    employeeid,
    fullname,
    username,
    password,
    accessid,
    status,
    createdby,
    createddate
  ) {
    this.id = id;
    this.employeeid = employeeid;
    this.fullname = fullname;
    this.username = username;
    this.password = password;
    this.accessid = accessid;
    this.status = status;
    this.createdby = createdby;
    this.createddate = createddate;
  }
}

class MasterEmployeeModel {
  constructor(
    id,
    firstname,
    middlename,
    lastname,
    position,
    accesstype,
    contactno,
    datehire,
    status,
    createdby,
    createddate
  ) {
    this.id = id;
    this.firstname = firstname;
    this.middlename = middlename;
    this.lastname = lastname;
    this.position = position;
    this.accesstype = accesstype;
    this.contactno = contactno;
    this.datehire = datehire;
    this.status = status;
    this.createdby = createdby;
    this.createddate = createddate;
  }
}

class MasterPositionModel {
  constructor(id, name, status, createdby, createddate) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.createdby = createdby;
    this.createddate = createddate;
  }
}

class MasterAccessTypeModel {
  constructor(id, name, status, createdby, createddate) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.createdby = createdby;
    this.createddate = createddate;
  }
}

class MasterPaymentModel {
  constructor(id, name, status, createdby, createddate) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.createdby = createdby;
    this.createddate = createddate;
  }
}

class MasterProductCategoryModel {
  constructor(id, name, status, createdby, createddate) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.createdby = createdby;
    this.createddate = createddate;
  }
}

class MasterPOSModel {
  constructor(id, name, serial, min, ptu, status) {
    this.id = id;
    this.name = name;
    this.serial = serial;
    this.min = min;
    this.ptu = ptu;
    this.status = status;
  }
}

class MasteStoreModel {
  constructor(id, name, logo, address, contact, message) {
    this.id = id;
    this.name = name;
    this.logo = logo;
    this.address = address;
    this.contact = contact;
    this.message = message;
  }
}

class ProductModel {
  constructor(
    id,
    categoryid,
    description,
    image,
    barcode,
    price,
    status,
    createdby,
    createddate
  ) {
    this.id = id;
    this.categoryid = categoryid;
    this.description = description;
    this.image = image;
    this.barcode = barcode;
    this.price = price;
    this.status = status;
    this.createdby = createdby;
    this.createddate = createddate;
  }
}

class SalesDetailModel {
  constructor(id, posid, date, cashier, paymenttype, details, total) {
    this.id = id;
    this.posid = posid;
    this.date = date;
    this.cashier = cashier;
    this.paymenttype = paymenttype;
    this.details = details;
    this.total = total;
  }
}

class SalesItemModel {
  constructor(id, detailid, description, price, quantity, total) {
    this.id = id;
    this.detailid = detailid;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.total = total;
  }
}

class CustomerModel {
  constructor(
    id,
    firstname,
    middlename,
    lastname,
    contactnumber,
    gender,
    address,
    username,
    password,
    registereddate
  ) {
    this.id = id;
    this.firstname = firstname;
    this.middlename = middlename;
    this.lastname = lastname;
    this.contactnumber = contactnumber;
    this.gender = gender;
    this.address = address;
    this.username = username;
    this.password = password;
    this.registereddate = registereddate;
  }
}

class CustomerOrderModel {
  constructor(id, customerid, date, details, total, paymenttype, status) {
    this.id = id;
    this.customerid = customerid;
    this.date = date;
    this.details = details;
    this.total = total;
    this.paymenttype = paymenttype;
    this.status = status;
  }
}

class RequestOrderModel {
  constructor(id, customerorderid, date, status) {
    this.id = id;
    this.customerorderid = customerorderid;
    this.date = date;
    this.status = status;
  }
}

class CustomerCreditModel {
  constructor(id, customerid, balance, status) {
    this.id = id;
    this.customerid = customerid;
    this.balance = balance;
    this.status = status;
  }
}

class BalanceHistoryModel {
  constructor(id, creditid, date, amount, type) {
    this.id = id;
    this.creditid = creditid;
    this.date = date;
    this.amount = amount;
    this.type = type;
  }
}

class ProdcutInventoryModel {
  constructor(id, productid, quantity) {
    this.id = id;
    this.productid = productid;
    this.quantity = quantity;
  }
}

class InventoryHistoryModel {
  constructor(id, date, inventoryid, productid, quantity, type) {
    this.id = id;
    this.productid = productid;
    this.quantity = quantity;
    this.date = date;
    this.inventoryid = inventoryid;
    this.type = type;
  }
}

class SalesInventoryModel {
  constructor(id, detailid, productid, posid) {
    this.id = id;
    this.productid = productid;
    this.detailid = detailid;
    this.posid = posid;
  }
}

class ItemsModel {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

//#endregion

//#region
class UserLoginModel {
  constructor(employeeid, fullname, accesstype, position) {
    this.employeeid = employeeid;
    this.fullname = fullname;
    this.accesstype = accesstype;
    this.position = position;
  }
}
//#endregion

module.exports = {
  MasterUserModel,
  MasterEmployeeModel,
  MasterPositionModel,
  MasterAccessTypeModel,
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
};
