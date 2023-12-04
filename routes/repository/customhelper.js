const fs = require("fs");
const moment = require("moment");
const LINQ = require("node-linq").LINQ;
const os = require("os");
const interfaces = os.networkInterfaces();

//#region READ & WRITE JSON FILES
exports.ReadJSONFile = function (filepath) {
  // console.log(Read JSON file: ${filepath});
  var data = fs.readFileSync(filepath, "utf-8");
  // console.log(Contents: ${data});
  return JSON.parse(data);
};

exports.ReadFileBuffer = (filepath) => {
  var data = fs.readFileSync(filepath);

  return data;
};

exports.GetFolderList = function (dir) {
  // console.log(Content: ${dir});
  var data = fs.readdirSync(dir);
  return data;
};

exports.DeleteFile = (file) => {
  try {
    fs.unlinkSync(file);

    console.log("File is deleted.");
  } catch (error) {
    console.log(error);
  }
};

exports.GetFileListContains = (path, contains) => {
  try {
    var dataArr = [];
    var data = fs.readdirSync(path, "utf-8");

    data.forEach((d) => {
      if (d.includes(contains)) {
        // console.log(d);
        dataArr.push({
          file: d,
        });
      }
    });

    return dataArr;
  } catch (error) {
    console.log(error);
  }
};

exports.GetFiles = function (dir) {
  //console.log(Content: ${dir});
  var data = fs.readdirSync(dir);
  return data;
};

exports.CreateJSON = (filenamepath, data) => {
  // console.log(Create JSON Path: ${filenamepath} Content: ${data});
  fs.writeFileSync(filenamepath, data, (err) => {
    return err;
  });
};

exports.CreateFolder = (dir) => {
  //console.log(Create folder: ${dir});
  if (fs.existsSync(dir)) {
    //console.log(Path exist: ${dir});
    return "exist";
  } else {
    //console.log(Create path: ${dir});
    fs.mkdirSync(dir);
    return "create";
  }
};

exports.RequestDetails = (data) => {
  // console.log(Request Details Extract: ${data});
  var result = [];
  data.forEach((k, i) => {
    result.push({
      store: k.store,
      ticket: k.ticket,
      brandname: k.brandname,
      itemtype: k.itemtype,
      quantity: k.quantity,
      remarks: k.remarks,
    });
  });
  return result;
};

//equipments item type
exports.Distinct = (data, indetifier, target) => {
  //console.log(Data: ${data} \nTarget: ${brandname});
  var unique = [];

  if (indetifier == "itemtype") {
    // itemtype
    unique = data.map((item) => {
      if (item.brandname == target) {
        return item.itemname;
      }
    });
  }

  if (indetifier == "brandname") {
    // brandname
    unique = [...new Set(data.map((item) => item.brandname))];
  }

  return unique;
};

exports.MoveFile = (origin, destination) => {
  fs.renameSync(origin, destination);
  console.log(`Moved ${origin} to ${destination}`);
};

//#endregion

//#region  DATETIME
exports.GetCurrentYear = () => {
  return moment().format("YYYY");
};

exports.GetCurrentMonth = () => {
  return moment().format("MM");
};

exports.GetCurrentDay = () => {
  return moment().format("DD");
};

exports.GetCurrentDate = () => {
  return moment().format("YYYY-MM-DD");
};

exports.GetCurrentDatetime = () => {
  return moment().format("YYYY-MM-DD HH:mm");
};

exports.GetCurrentDatetimeSecconds = () => {
  return moment().format("YYYY-MM-DD HH:mm:ss");
};

exports.GetCurrentTime = () => {
  return moment().format("HH:mm");
};

exports.GetCurrentTimeSeconds = () => {
  return moment().format("HH:mm:ss");
};

exports.GetCurrentMonthFirstDay = () => {
  return moment().startOf("month").format("YYYY-MM-DD");
};

exports.GetCurrentMonthLastDay = () => {
  return moment().endOf("month").format("YYYY-MM-DD");
};

exports.ConvertToDate = (datetime) => {
  return moment(`${datetime}`).format("YYYY-MM-DD");
};

exports.AddDayTime = (day, hour) => {
  let now = moment();
  let future = now.add({ days: day, hours: hour });

  return future.format("YYYY-MM-DD hh:mm");
};

exports.SubtractDayTime = (idate, fdate) => {
  const initaldate = moment(`${idate}`);
  const finaldate = moment(`${fdate}`);
  const diffInDays = finaldate.diff(initaldate, "days");

  return diffInDays;
};
//#endregion

//#region  SUMMARY REPORTS
exports.GetCablingEquipmentSummary = (target_folder) => {
  var data = [];
  let folders = this.GetFolderList(target_folder);

  folders.forEach((folder) => {
    let targetDir = `${target_folder}${folder}`;
    var files = this.GetFiles(targetDir);

    files.forEach((file) => {
      let filename = `${targetDir}/${file}`;
      jsonData = this.ReadJSONFile(filename);

      jsonData.forEach((key, item) => {
        data.push({
          itemname: key.itemtype,
          itemcount: key.itemcount,
        });
      });
    });
  });

  return data;
};

exports.GetRequestSummary = (it, tranfer, cabling) => {
  var data = [];
  let itequipmentrequest = fs.readdirSync(it);
  let transferequipmentrequest = fs.readdirSync(tranfer);
  let cablingequipmentrequest = fs.readdirSync(cabling);

  data.push({
    itrequest: itequipmentrequest.length,
    transfer: transferequipmentrequest.length,
    cablingrequest: cablingequipmentrequest.length,
  });

  return data;
};

exports.GetDetailedEquipmentSummary = (
  masterItemsDir,
  equipmentDir,
  department
) => {
  try {
    let data;
    let filter = [];
    let itemsArr = this.GetFiles(masterItemsDir);
    let folders = this.GetFolderList(equipmentDir);

    console.log(`${masterItemsDir} - ${equipmentDir}`);

    let items_filter = new LINQ(itemsArr)
      .Where((item) => {
        return item.includes(department);
      })
      .OrderBy((item) => {
        return item;
      })
      .ToArray();

    items_filter.forEach((item) => {
      let itemname = item.split("_");
      filter.push(itemname[0]);
    });

    //read all json files in equipment folder on each folders
    ReadAllJSONFiles = (folders, root) => {
      let filesArr = [];
      folders.forEach((folder) => {
        let targetFolder = `${root}${folder}`;
        let files = this.GetFiles(targetFolder);

        files.forEach((file) => {
          filesArr.push({
            file: file,
          });
        });
      });

      return filesArr;
    };
    //get item counts
    GetItemCountSummary = (files, filter) => {
      let items = [];

      console.log(itemsArr);

      filter.forEach((item) => {
        let arr = new LINQ(files)
          .Where((t) => {
            return t.file.includes(item);
          })
          .OrderBy((t) => {
            return t.file;
          })
          .ToArray();

        items.push({
          itemname: item,
          itemcount: arr.length,
        });
      });

      console.log(items);

      return items;
    };

    let files = ReadAllJSONFiles(folders, equipmentDir);

    console.log(files);

    data = GetItemCountSummary(files, filter);

    console.log(data);

    return data;
  } catch (error) {
    throw error;
  }
};

exports.GetEquipmentSummary = (target_folder) => {
  var data = [];
  let folders = this.GetFolderList(target_folder);

  folders.forEach((folder) => {
    let targetFolder = `${target_folder}${folder}`;
    var files = fs.readdirSync(targetFolder);
    data.push({
      itemname: folder,
      itemcount: files.length,
    });
  });

  return data;
};
//#endregion

//#region
exports.UpdateCablingItemCount = (target_file, itemcount) => {
  let file = this.ReadJSONFile(target_file);
  let data = [];

  console.log(`TARGET FILE: ${target_file} DEDUCTION: ${itemcount}`);
  let difference = 0;
  file.forEach((key, item) => {
    let current_count = parseFloat(key.itemcount);
    let deduct = parseFloat(itemcount);
    difference = current_count - deduct;
    let dataJson;

    console.log(`${current_count} - ${deduct}`);

    data.push({
      brandname: key.brandname,
      itemtype: key.itemtype,
      itemcount: difference,
      updateby: key.updateby,
      updatedate: key.updatedate,
      createdby: key.createdby,
      createddate: key.createddate,
    });

    dataJson = JSON.stringify(data, null, 2);
    this.CreateJSON(target_file, dataJson);
  });
};
//#endregion

//#region USE LINQ for filtering json data
exports.GetByDeparmentItems = (data, index, callback) => {
  try {
    let arr = new LINQ(data)
      .Where((d) => {
        return d.department === index;
      })
      .Select((d) => {
        return { brandname: d.brandname };
      })
      .ToArray();

    callback(null, arr);
  } catch (error) {
    callback(null, error);
  }
};

exports.GetByDeparmentPersonel = (data, index, callback) => {
  try {
    let arr = new LINQ(data)
      .Where((d) => {
        return d.positions === index;
      })
      .Select((d) => {
        return { fullname: d.fullname };
      })
      .ToArray();

    callback(null, arr);
  } catch (error) {
    callback(null, error);
  }
};

exports.GetByClientStores = (data, index, callback) => {
  try {
    let arr = new LINQ(data)
      .Where((d) => {
        return d.clientname === index;
      })
      .Select((d) => {
        return { storename: `${d.storenumber} ${d.storename}` };
      })
      .ToArray();

    callback(null, arr);
  } catch (error) {
    callback(null, error);
  }
};
//#endregion

//#region
exports.JSONNoSpace = (data) => {
  const jsonString = JSON.stringify(data, (key, value) => {
    if (typeof value === "string") {
      return value.replace(/\s/g, "");
    }
    console.log(jsonString);
    return value;
  });
};

exports.JSONRevert = (json) => {};
//#endregion

//#region number padding
exports.GeneratePO = (year, number) => {
  const padded = number.toString().padStart(4, "0");
  const ponumber = `${year}-${padded}`;
  return ponumber;
};
//#endregion

//#region array filters
exports.removeDuplicateSets = (arr) => {
  const uniqueSets = new Set(arr.map(JSON.stringify)); // Use JSON.stringify for comparison
  const result = Array.from(uniqueSets).map(JSON.parse);
  return result;
};

exports.ConvertToJson = (data) => {
  const uniqueSets = new Set(data.map(JSON.stringify)); // Use JSON.stringify for comparison
  const result = Array.from(uniqueSets).map(JSON.parse);
  return result;
};
//#endregion

exports.formatCurrency = (value) => {
  var formattedValue = parseFloat(value).toFixed(2);
  return "₱" + formattedValue.replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

//#region Network Information

exports.getNetwork = () => {
  return new Promise((resolve, reject) => {
    Object.keys(interfaces).forEach((interfaceName) => {
      interfaces[interfaceName].forEach((iface) => {
        // Filter for IPv4 addresses
        if (iface.family === "IPv4" && !iface.internal) {
          console.log(`${interfaceName}: ${iface.address}`);
          resolve(`${iface.address}`);
        }
      });
    });
  });
};

//#endregion

//#region Select Parameter Query data=[1,2,3]
exports.SelectStatement = (str, data) => {
  let statement = "";
  let found = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "?") {
      statement += `'${data[found]}'`;
      found += 1;
    } else {
      statement += str[i];
    }
  }
  return statement;
};
//#endregion

//#region Email Reply Format
let css = `<style>
/* -------------------------------------
    GLOBAL
    A very basic CSS reset
------------------------------------- */
* {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    box-sizing: border-box;
    font-size: 14px;
}

img {
    max-width: 100%;
}

body {
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: none;
    width: 100% !important;
    height: 100%;
    line-height: 1.6;
}

/* Let's make sure all tables have defaults */
table td {
    vertical-align: top;
}

/* -------------------------------------
    BODY & CONTAINER
------------------------------------- */
body {
    background-color: #f6f6f6;
}

.body-wrap {
    background-color: #f6f6f6;
    width: 100%;
}

.container {
    display: block !important;
    max-width: 600px !important;
    margin: 0 auto !important;
    /* makes it centered */
    clear: both !important;
}

.content {
    max-width: 800px;
    margin: 0 auto;
    display: block;
    padding: 20px;
}

/* -------------------------------------
    HEADER, FOOTER, MAIN
------------------------------------- */
.main {
    background: #fff;
    border: 1px solid #e9e9e9;
    border-radius: 3px;
}

.content-wrap {
    padding: 20px;
}

.content-block {
    padding: 0 0 20px;
}

.header {
    width: 100%;
    margin-bottom: 20px;
}

.footer {
    width: 100%;
    clear: both;
    color: #999;
    padding: 20px;
}
.footer a {
    color: #999;
}
.footer p, .footer a, .footer unsubscribe, .footer td {
    font-size: 12px;
}

/* -------------------------------------
    TYPOGRAPHY
------------------------------------- */
h1, h2, h3 {
    font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    color: #000;
    margin: 40px 0 0;
    line-height: 1.2;
    font-weight: 400;
}

h1 {
    font-size: 32px;
    font-weight: 500;
}

h2 {
    font-size: 24px;
}

h3 {
    font-size: 18px;
}

h4 {
    font-size: 14px;
    font-weight: 600;
}

p, ul, ol {
    margin-bottom: 10px;
    font-weight: normal;
}
p li, ul li, ol li {
    margin-left: 5px;
    list-style-position: inside;
}

/* -------------------------------------
    LINKS & BUTTONS
------------------------------------- */
a {
    color: #1ab394;
    text-decoration: underline;
}

.btn-primary {
    text-decoration: none;
    color: #FFF;
    background-color: #1ab394;
    border: solid #1ab394;
    border-width: 5px 10px;
    line-height: 2;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    border-radius: 5px;
    text-transform: capitalize;
}

/* -------------------------------------
    OTHER STYLES THAT MIGHT BE USEFUL
------------------------------------- */
.last {
    margin-bottom: 0;
}

.first {
    margin-top: 0;
}

.aligncenter {
    text-align: center;
}

.alignright {
    text-align: right;
}

.alignleft {
    text-align: left;
}

.clear {
    clear: both;
}

/* -------------------------------------
    ALERTS
    Change the class depending on warning email, good email or bad email
------------------------------------- */
.alert {
    font-size: 16px;
    color: #fff;
    font-weight: 500;
    padding: 20px;
    text-align: center;
    border-radius: 3px 3px 0 0;
}
.alert a {
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    font-size: 16px;
}
.alert.alert-warning {
    background: #f8ac59;
}
.alert.alert-bad {
    background: #ed5565;
}
.alert.alert-good {
    background: #1ab394;
}

/* -------------------------------------
    INVOICE
    Styles for the billing table
------------------------------------- */
.invoice {
    margin: 40px auto;
    text-align: left;
    width: 80%;
}
.invoice td {
    padding: 5px 0;
}
.invoice .invoice-items {
    width: 100%;
}
.invoice .invoice-items td {
    border-top: #eee 1px solid;
}
.invoice .invoice-items .total td {
    border-top: 2px solid #333;
    border-bottom: 2px solid #333;
    font-weight: 700;
}

/* -------------------------------------
    RESPONSIVE AND MOBILE FRIENDLY STYLES
------------------------------------- */
@media only screen and (max-width: 640px) {
    h1, h2, h3, h4 {
        font-weight: 600 !important;
        margin: 20px 0 5px !important;
    }

    h1 {
        font-size: 22px !important;
    }

    h2 {
        font-size: 18px !important;
    }

    h3 {
        font-size: 16px !important;
    }

    .container {
        width: 100% !important;
    }

    .content, .content-wrap {
        padding: 10px !important;
    }

    .invoice {
        width: 100% !important;
    }
}
</style>`;

exports.EmailContent = (
  data,
  orderid,
  customer,
  paymenttype,
  customeraddress
) => {
  let items = JSON.parse(data);
  let total = 0;
  let itemdetails = "";

  let orderdetail = `Customer Name:${customer}<br>Payment Type:${paymenttype}<br>Drop Point:${customeraddress}`;

  items.forEach((key, item) => {
    let details = key.items;
    details.forEach((key, item) => {
      console.log("Items", key);
      let quantity = parseFloat(key.quantity);
      let price = parseFloat(key.price) / quantity;
      let subtotal = quantity * price;
1
      itemdetails += `        <tr>
            <td>${key.name} x ${key.quantity} </td>
            <td class="alignright">${this.formatCurrency(price)}</td>
            <td class="alignright">${this.formatCurrency(subtotal)} </td>
          </tr>
        `;
      total += subtotal;
    });
  });

  return `
  <html>
<head>
${css}
</head>
<body>

<table class="body-wrap">
    <tbody><tr>
        <td></td>
        <td class="container" width="600">
            <div class="content">
                <table class="main" width="100%" cellpadding="0" cellspacing="0">
                    <tbody><tr>
                        <td class="content-wrap aligncenter">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tbody>
                                <tr>
                                    <td class="content-block">
                                        <h2>Order ID: ${orderid}</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="content-block">
                                        <table class="invoice">
                                            <tbody>
                                            <tr>
                                                <td>${orderdetail}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table class="invoice-items" cellpadding="0" cellspacing="10">
                                                        <thead>
                                                          <th>Item</th>
                                                          <th>Price</th>
                                                          <th>Subtotal</th>
                                                        </thead>
                                                        <tbody>
                                                          ${itemdetails}
                                                          <tr class="total">
                                                              <td class="aligncenter" width="60%">Total</td>
                                                              <td></td>
                                                              <td class="alignright">${this.formatCurrency(
                                                                total
                                                              )}</td>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                  <td>Thank you for being our valued customer. We hope our product will meet your expectations. Let us know if you have any questions.</td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                </tbody></table>
                <div class="footer">
                    <table width="100%">
                        <tbody>
                        <tr>
                            <td class="aligncenter content-block">Questions? Email <a href="mailto:">hideouturban@gmail.com</a></td>
                        </tr>
                    </tbody></table>
                </div></div>
        </td>
        <td></td>
    </tr>
</tbody></table>
</body>
</html> `;
};

exports.EmailStatus = (data, status) => {
  let items = JSON.parse(data);
  let total = 0;
  let itemdetails = "";

  items.forEach((key, item) => {
    let details = key.items;
    details.forEach((key, item) => {
      console.log("Items", key);
      let quantity = parseFloat(key.quantity);
      let price = parseFloat(key.price) / quantity;
      let subtotal = quantity * price;

      itemdetails += `        <tr>
            <td>${key.name} x ${key.quantity} </td>
            <td class="alignright">${this.formatCurrency(price)}</td>
            <td class="alignright">${this.formatCurrency(subtotal)} </td>
          </tr>
        `;
      total += subtotal;
    });
  });

  return `
<html>
<head>
${css}
</head>

<body>
<table class="body-wrap">
    <tbody><tr>
        <td></td>
        <td class="container" width="600">
            <div class="content">
                <table class="main" width="100%" cellpadding="0" cellspacing="0">
                    <tbody><tr>
                        <td class="content-wrap aligncenter">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tbody>
                                <tr>
                                    <td class="content-block">
                                        <h2>${status}</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="content-block">
                                        <table class="invoice">
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <table class="invoice-items" cellpadding="0" cellspacing="10">
                                                        <thead>
                                                          <th>Item</th>
                                                          <th>Price</th>
                                                          <th>Subtotal</th>
                                                        </thead>
                                                        <tbody>
                                                          ${itemdetails}
                                                          <tr class="total">
                                                              <td class="aligncenter" width="60%">Total</td>
                                                              <td></td>
                                                              <td class="alignright">${this.formatCurrency(
                                                                total
                                                              )}</td>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                                <tr>
                                  <td>Thank you for being our valued customer. We hope our product will meet your expectations. Let us know if you have any questions.</td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                </tbody></table>
                <div class="footer">
                    <table width="100%">
                        <tbody>
                        <tr>
                            <td class="aligncenter content-block">Questions? Email <a href="mailto:">hideouturban@gmail.com</a></td>
                        </tr>
                    </tbody></table>
                </div></div>
        </td>
        <td></td>
    </tr>
</tbody></table>
</body>
</html> `;
};

//#endregion
