const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

// Path to the CSV file stored on the server
const csvFilePath = path.join(__dirname, '../public/UserData.csv'); // Adjust the path as needed

// Utility function to find farm and farmer information based on farmRegistrationNo
const findFarmAndFarmerByRegistrationNo = (farmRegistrationNo) => {
  console.log(farmRegistrationNo);
  
  return new Promise((resolve, reject) => {
    let foundData = null;

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        
        if (row.farmRegisterationNo === farmRegistrationNo) {
          console.log("matched");
          
          // Extracting relevant fields from CSV
          foundData = {
            farmInformation: row.farmInformation || '',
            farmLatitude: parseFloat(row.farmLatitude) || 0, // Ensure numeric value or default to 0
            farmLongitude: parseFloat(row.farmLongitude) || 0, // Ensure numeric value or default to 0
            farmAddress: row.farmAddress || '',
            aadhaarNumber: row.aadhaarNumber || '',
            farmerName: row.farmerName || ''
          };
          console.log(row.farmerName);
          
        }
      })
      .on('end', () => {
        if (foundData) {
          resolve(foundData);
        } else {
          reject(new Error('Farm registration number not found in CSV.'));
        }
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

module.exports = { findFarmAndFarmerByRegistrationNo };
