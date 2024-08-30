const xlsx = require('xlsx');
const path = require('path');

// Path to the Excel file stored on the server
const excelFilePath = path.join(__dirname, '../public/UserData.xlsx'); // Adjust the path as needed

// Utility function to find farm and farmer information based on farmRegistrationNo
const findFarmAndFarmerByRegistrationNo = (farmRegistrationNo) => {
  console.log(farmRegistrationNo);
  
  return new Promise((resolve, reject) => {
    // Load the Excel file
    const workbook = xlsx.readFile(excelFilePath);

    // Assuming the data is in the first sheet
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert the worksheet to JSON format
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Find the row matching the farm registration number
    const foundData = jsonData.find((row) => row.farmRegisterationNo === farmRegistrationNo);
    console.log(foundData);
    
    if (foundData) {
      // Extract relevant fields from the Excel row
      const farmAndFarmerInfo = {
        farmInformation: foundData.farmInformation || '',
        farmLatitude: parseFloat(foundData.farmLatitude) || 0, // Ensure numeric value or default to 0
        farmLongitude: parseFloat(foundData.farmLongitude) || 0, // Ensure numeric value or default to 0
        farmAddress: foundData.farmAddress || '',
        aadhaarNumber: foundData.aadhaarNumber || '',
        farmerName: foundData.farmerName || ''
      };
      console.log(farmAndFarmerInfo.farmAddress);
      resolve(farmAndFarmerInfo);
    } else {
      reject(new Error('Farm registration number not found in Excel.'));
    }
  });
};

module.exports = { findFarmAndFarmerByRegistrationNo };
