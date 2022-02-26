// Originally conceived as a more sophisticated repackager of the full license texts, 
// this relatively simple function was modularized in anticipation of more extensive 
// customization of the base text

// This function adds the current date and users legal or user name 
// to the full license text
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