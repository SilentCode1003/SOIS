const PdfMake = require("pdfmake");
const fs = require("fs");
const { GetCurrentDate } = require("./customhelper");
const path = require("path");

const fontPath = path.join(
  __dirname,
  "/fonts/Roboto/roboto-regular-webfont.ttf"
);

exports.Generate = (callback) => {
  try {
    var fonts = {
      Roboto: {
        normal: fontPath,
        bold: fontPath,
        italics: fontPath,
        bolditalics: fontPath,
      },
    };

    // var params = process.argv;
    // var data = [];
    // data["invoicenumber"] = "TEST";
    // data["buyeraddress"] = "TEST";
    // data["item"] = "TEST";

    const printer = new PdfMake(fonts);

    var reportContent = {
      pageSize: "A4",
      pageOrientation: "portrait",
      content: [
        {
          layout: "noBorders",
          fontSize: 8,
          alignment: "center",
          table: {
            widths: ["100%"],
            body: [
              [
                {
                  text: "Sales Report",
                  margin: [0, 10, 0, 0],
                  style: "header",
                },
              ],
              [{ text: "Orencio Kitchenmate", style: "subheader" }],
              [{ text: "Poblacion 1, Hamtic, Antique", style: "subheader" }],
              [{ text: "VAT REG: 002-125-548-546", style: "subheader" }],
            ],
          },
        }, //Header Company Details like name, address, vat reg
        {
          layout: "noBorders",
          fontSize: 8,
          alignment: "left",
          table: {
            widths: ["75%", "25%"],
            body: [
              [
                {
                  text: "Branch ID: 001",
                  margin: [0, 20, 0, 0],
                  style: "subheader",
                },
                {
                  text: "POS ID: 1",
                  margin: [0, 20, 0, 0],
                  style: "subheader",
                  alignment: "left",
                },
              ],
              [
                { text: "Branch Name: Hamtic", style: "subheader" },
                {
                  text: "POS Name: POS 1",
                  style: "subheader",
                  alignment: "left",
                },
              ],
              [
                { text: "Branch Manager: Joseph Orencio", style: "subheader" },
                {
                  text: "Dated: 2023-8-22",
                  style: "subheader",
                  alignment: "left",
                },
              ],
              [
                { text: "Cashier: Joseph Orencio", style: "subheader" },
                {
                  text: "Total sales: Php 458,455.99",
                  style: "subheader",
                  alignment: "left",
                },
              ],
            ],
          },
        }, //Sub Header Details
        {
          margin: [0, 15, 0, 0],
          fontSize: 8,
          table: {
            widths: ["5%", "56%", "13%", "13%", "13%"],
            body: [
              [
                { text: "Pos", border: [false, true, false, true] },
                { text: "Item", border: [false, true, false, true] },
                { text: "Price", border: [false, true, false, true] },
                {
                  text: "Quantity",
                  alignment: "center",
                  border: [false, true, false, true],
                },
                { text: "Total", border: [false, true, false, true] },
              ],
              [
                { text: "1", border: [false, true, false, true] },
                { text: "Sisig Classic", border: [false, true, false, true] },
                { text: "Php 79.00", border: [false, true, false, true] },
                {
                  text: "20",
                  alignment: "center",
                  border: [false, true, false, true],
                },
                { text: "Php 1,580.00", border: [false, true, false, true] },
              ],
            ],
          },
        },
        {
          layout: "noBorders",
          fontSize: 8,
          margin: [0, 0, 5, 0],
          table: {
            widths: ["88%", "12%"],
            body: [
              [
                {
                  text: "Subtotal:",
                  alignment: "right",
                  margin: [0, 5, 0, 0],
                  style: "subheader",
                },
                { text: "Php 1,580.00", margin: [0, 5, 0, 0] },
              ],
              // [{ text: "Tax %:", alignment: "right" }, "$0.00"],
            ],
          },
        },
        {
          fontSize: 8,
          table: {
            widths: ["88%", "12%"],
            body: [
              [
                {
                  text: "Total:",
                  alignment: "right",
                  border: [false, false, false, true],
                  margin: [0, 0, 0, 10],
                  style: "subheader",
                },
                {
                  text: "Php 1,580.00",
                  border: [false, false, false, true],
                  margin: [0, 0, 0, 10],
                },
              ],
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 22,
        },
        anotherStyle: {
          alignment: "right",
        },
        subheader: {
          fontSize: 8,
        },
      },
    };
    var options = {};

    const pdfPath = path.join(
      __dirname,
      `/reports/Sales_Report_${GetCurrentDate()}.pdf`
    );

    // create invoice and save it to invoices_pdf folder
    // const printer = new PdfMake();
    var pdfDoc = printer.createPdfKitDocument(reportContent);

    const chunks = [];
    pdfDoc.on("data", (chunk) => chunks.push(chunk));
    pdfDoc.on("end", () => callback(null, Buffer.concat(chunks)));
    pdfDoc.on("error", (error) => callback(error, null));

    pdfDoc.end();

    // pdfDoc.pipe(fs.createWriteStream(pdfPath));
    // pdfDoc.end();

    // callback(null, pdfPath);
  } catch (error) {
    callback(error, null);

    console.log(error);
  }
};
