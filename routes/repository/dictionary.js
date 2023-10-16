exports.GetValue = (abr) => {
  if (abr == "WH") return "WAREHOUSE";
  if (abr == "DLV") return "TO BE DELIVER TO CLIENT";
  if (abr == "NPD") return "NOT PAID";
  if (abr == "SLD") return "SOLD";
  if (abr == "PIC") return "FOR PICKUP TO WAREHOUSE";
  if (abr == "PD") return "PAID";
  if (abr == "NSTK") return "NO STOCKS AVAILABLE";
  if (abr == "REQ") return "REQUEST";
  if (abr == "PND") return "PENDING";
  if (abr == "APD") return "APPROVED";
  if (abr == "ALLOC") return "ALLOCATE SERIALS";
  if (abr == "ALLOCP") return "ALLOCATE PRICE";
  if (abr == "REQB") return "REQUEST BUDGET";
  if (abr == "WAIT") return "WAITING";
  if (abr == "RES") return "RESTOCK";
  if (abr == "FAPR") return "FOR APPROVAL";
  if (abr == "SPR") return "SPARE";
  if (abr == "DLY") return "DEPLOYED";
  if (abr == "RET") return "RETURNED";
  if (abr == "ACT") return "ACTIVE";
  if (abr == "INACT") return "INACTIVE";
  if (abr == "REM") return "REMOVE";
  if (abr == "UPD") return "UPDATE";
  if (abr == "INST") return "INST";
  if (abr == "CND") return "CANCELLED";
  if (abr == "STR") return "START";
  if (abr == "CLD") return "CLOSED";
  if (abr == "INP") return "IN PROGRESS";
  if (abr == "MSTR") return "MASTERS";
  if (abr == "TRN") return "TRANSACTION";
  if (abr == "INV") return "INVENTORY";
  if (abr == "PRD") return "PRODUCTION";
  if (abr == "INF") return "INFO";
  if (abr == "WRN") return "WARNING";
  if (abr == "ERR") return "ERROR";
  if (abr == "DND") return "DONE";
  if (abr == "TRF") return "TRANSFER";
  if (abr == "PO") return "PURCHASE ORDER";
  if (abr == "SLD") return "SOLD";
  if (abr == "INSD") return "INSERT DATA";
  if (abr == "UPDT") return "UPDATE DATA";
  if (abr == "CMP") return "COMPLETED";

};

//#region STATUS CODE
exports.CMP = () => {
  return "CMP";
};

exports.TRF = () => {
  return "TRF";
};

exports.MSTR = () => {
  return "MSTR";
};

exports.TRN = () => {
  return "TRN";
};

exports.INV = () => {
  return "INV";
};

exports.PRD = () => {
  return "PRD";
};

exports.INF = () => {
  return "INF";
};

exports.WRN = () => {
  return "WRN";
};

exports.ERR = () => {
  return "ERR";
};

exports.CND = () => {
  return "CND";
};

exports.WH = () => {
  return "WH";
};

exports.DLV = () => {
  return "DLV";
};

exports.NPD = () => {
  return "NPD";
};

exports.SLD = () => {
  return "SLD";
};

exports.PIC = () => {
  return "PIC";
};

exports.PD = () => {
  return "PD";
};

exports.NSTK = () => {
  return "NSTK";
};

exports.REQ = () => {
  return "REQ";
};

exports.PND = () => {
  return "PND";
};

exports.APD = () => {
  return "APD";
};

exports.ALLOC = () => {
  return "ALLOC";
};

exports.REQB = () => {
  return "REQB";
};

exports.WAIT = () => {
  return "WAIT";
};

exports.ALLOCP = () => {
  return "ALLOCP";
};

exports.RES = () => {
  return "RES";
};

exports.FAPR = () => {
  return "FAPR";
};

exports.SPR = () => {
  return "SPR";
};

exports.DLY = () => {
  return "DLY";
};

exports.RET = () => {
  return "RET";
};

exports.ACT = () => {
  return "ACT";
};

exports.REM = () => {
  return "REM";
};

exports.UPD = () => {
  return "UPD";
};

exports.INST = () => {
  return "INST";
};

exports.INACT = () => {
  return "INACT";
};

exports.STR = () => {
  return "STR";
};

exports.CLD = () => {
  return "CLD";
};

exports.INP = () => {
  return "INP";
};

exports.DND = () => {
  return "DND";
};

exports.PO = () => {
  return "PO";
};

exports.SLD = () => {
  return "SLD";
};

exports.INSD = () => {
  return "INSD";
};

exports.UPDT = () => {
    return "UPDT";
  };
//#endregion
