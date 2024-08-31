import React, { useState } from 'react';
import { Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const CompanyAgreementForm = () => {
  const [formData, setFormData] = useState({
    contractDescription: '',
    cropType: '',
    quantityRequired: '',
    pricePerUnit: '',
    totalprice: '',
    paymentTerms: '',
    contractDuration: '',
    deliverySchedule: '',
    deliveryLocation: '',
    qualityStandards: '',
    supportServicesProvided: '',
    riskMitigationClauses: '',
    contactInformation: '',
    applicationDeadline: '',
    cropImage: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      cropImage: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:5000/api/agreement/new', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'auth-token': localStorage.getItem('Auth-token')
        }
      });

      if (response.ok) {
        alert('Agreement submitted successfully!');
      } else {
        throw new Error('Failed to submit agreement.');
      }
    } catch (error) {
      console.error('Error submitting agreement:', error);
      alert('Failed to submit agreement.');
    }
  };

  return (
    <div className="form-container">
      <Typography variant="h4" gutterBottom>
        Submit New Agreement
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Contract Description"
          name="contractDescription"
          value={formData.contractDescription}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Crop Type</InputLabel>
          <Select
            name="cropType"
            value={formData.cropType}
            onChange={handleChange}
          >
            <MenuItem value="Onion">Onion</MenuItem>
            <MenuItem value="Potato">Potato</MenuItem>
            <MenuItem value="Potato">Wheat</MenuItem>
            {/* Add more crop types as needed */}
          </Select>
        </FormControl>
        <TextField
          label="Quantity Required"
          name="quantityRequired"
          type="number"
          value={formData.quantityRequired}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Price Per Unit"
          name="pricePerUnit"
          type="number"
          value={formData.pricePerUnit}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Total Price"
          name="totalprice"
          type="number"
          value={formData.totalprice}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Payment Terms"
          name="paymentTerms"
          value={formData.paymentTerms}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Contract Duration"
          name="contractDuration"
          value={formData.contractDuration}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Delivery Schedule"
          name="deliverySchedule"
          value={formData.deliverySchedule}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Delivery Location"
          name="deliveryLocation"
          value={formData.deliveryLocation}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Quality Standards"
          name="qualityStandards"
          value={formData.qualityStandards}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Support Services Provided"
          name="supportServicesProvided"
          value={formData.supportServicesProvided}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Risk Mitigation Clauses"
          name="riskMitigationClauses"
          value={formData.riskMitigationClauses}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contact Information"
          name="contactInformation"
          value={formData.contactInformation}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Application Deadline"
          name="applicationDeadline"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.applicationDeadline}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          variant="contained"
          component="label"
          fullWidth
          margin="normal"
        >
          Upload Crop Image
          <input
            type="file"
            name="cropImage"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          margin="normal"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CompanyAgreementForm;
