const xlsx = require('xlsx');
const path = require('path');

// Path to the Excel file stored on the server
const excelFilePath = path.join(__dirname, '../public/CompanyData.xlsx'); // Adjust the path as needed

// Utility function to find company information based on companyRegistrationNo
const findCompanyByRegistrationNo = (companyRegistrationNo) => {
  console.log(companyRegistrationNo);

  return new Promise((resolve, reject) => {
    // Load the Excel file
    const workbook = xlsx.readFile(excelFilePath);

    // Assuming the data is in the first sheet
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert the worksheet to JSON format
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Find the row matching the company registration number
    const foundData = jsonData.find((row) => row.CINID === companyRegistrationNo);
    console.log("foundData>> "+foundData.CompanyLocation);

    if (foundData) {
      // Extract relevant fields from the Excel row
      const companyInfo = {
        companyName: foundData.CompanyName || '',
        companyInfo: foundData.CompanyLocation || ''
      };
      console.log(companyInfo);
      resolve(companyInfo);
    } else {
      reject(new Error('Company registration number not found in Excel.'));
    }
  });
};

module.exports = { findCompanyByRegistrationNo };
