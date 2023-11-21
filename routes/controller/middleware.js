var roleacess = [
  {
    role: "Administrator",
    routes: [
      {
        layout: "dashboard",
      },
      {
        layout: "balancehistory",
      },
      {
        layout: "customer",
      },
      {
        layout: "customercredit",
      },
      {
        layout: "customerorder",
      },
      {
        layout: "inventoryhistory",
      },
      {
        layout: "masteraccess",
      },
      {
        layout: "mastercategory",
      },
      {
        layout: "masteremployee",
      },
      {
        layout: "masterpayment",
      },
      {
        layout: "masterpos",
      },
      {
        layout: "masterposition",
      },
      {
        layout: "masterstore",
      },
      {
        layout: "masteruser",
      },
      {
        layout: "product",
      },
      {
        layout: "productinventory",
      },
      {
        layout: "requestorder",
      },
      {
        layout: "salesdetails",
      },
      {
        layout: "salesinventory",
      },
      {
        layout: "masterrating",
      },
      {
        layout: "customerfeedback",
      },
      {
        layout: "reports",
      },
    ],
  },
  {
    role: "User",
    routes: [
      {
        layout: "dashboard",
      },
      {
        layout: "balancehistory",
      },
      {
        layout: "customer",
      },
      {
        layout: "customercredit",
      },
      {
        layout: "customerorder",
      },
      {
        layout: "inventoryhistory",
      },
      {
        layout: "product",
      },
      {
        layout: "productinventory",
      },
      {
        layout: "requestorder",
      },
      {
        layout: "salesdetails",
      },
      {
        layout: "salesinventory",
      },
      {
        layout: "customerfeedback",
      },
      {
        layout: "reports",
      },
    ],
  },
];

exports.Validator = function (req, res, layout) {
  // console.log(layout);
  // console.log(roleacess.length);

  if (req.session.accesstype == "User" && layout == "index") {
    return res.redirect("/dashboard");
  } else {
    roleacess.forEach((key, item) => {
      var routes = key.routes;

      routes.forEach((value, index) => {
        if (key.role == req.session.accesstype && value.layout == layout) {
          console.log(`${key.role} - ${value.layout}`);
          return res.render(`${layout}`, {
            employeeid: req.session.employeeid,
            fullname: req.session.fullname,
            accesstype: req.session.accesstype,
            position: req.session.position,
          });
        }
      });
    });

    res.redirect("/login");
  }
};
