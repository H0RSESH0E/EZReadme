const renderFullLicenseText = (userDataObj) => {
  var today = new Date();
  var date = today.getFullYear();
  let { fullLicenseText: fLT } = userDataObj

  let { licenseName: lN } = userDataObj;

  lN ? lN : lN = userDataObj.userName;
  fLT = fLT.replace('[year]', `${date}`);
  fLT = fLT.replace('[fullname]', `${lN}`);

  userDataObj.fullLicenseText = fLT

  return userDataObj;
}

module.exports = { renderFullLicenseText };