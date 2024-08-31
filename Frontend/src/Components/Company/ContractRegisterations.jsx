import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faTag, faUser } from '@fortawesome/free-solid-svg-icons';

const CompanyContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [expandedContractId, setExpandedContractId] = useState(null);
  const [applicants, setApplicants] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/agreement/company/contracts', {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('Auth-token')
        },
      });
      if (response.ok) {
        const data = await response.json();
        setContracts(data);
      } else {
        throw new Error('Failed to fetch contracts');
      }
    } catch (error) {
      setError('Error fetching contracts');
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = async (contractId) => {
    if (expandedContractId === contractId) {
      // Collapse the expanded contract
      setExpandedContractId(null);
    } else {
      // Expand the contract and fetch applicants for this contract
      setExpandedContractId(contractId);
      try {
        const response = await fetch(`http://localhost:5000/api/agreement/${contractId}/applicants`, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('Auth-token')
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Store applicants in state keyed by contractId
          setApplicants((prev) => ({
            ...prev,
            [contractId]: data
          }));
        } else {
          throw new Error('Failed to fetch applicants');
        }
      } catch (error) {
        setError('Error fetching applicants');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {contracts.map((contract) => (
        <div key={contract._id} className="bg-white p-6 rounded-lg shadow-lg mb-4">
          <h2 className="text-2xl font-bold mb-4">Contract Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faBuilding} className="text-blue-500 mr-2" />
              <strong className="w-1/3">Company ID:</strong>
              <span>{contract.companyId}</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faTag} className="text-blue-500 mr-2" />
              <strong className="w-1/3">Contract Description:</strong>
              <span>{contract.contractDescription}</span>
            </div>
            {/* Other contract fields can be added here */}
          </div>

          <Button
            onClick={() => handleShowMore(contract._id)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {expandedContractId === contract._id ? 'Show Less' : 'Show More'}
          </Button>

          {expandedContractId === contract._id && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Applicants</h3>
              {applicants[contract._id] && applicants[contract._id].length > 0 ? (
                <ul>
                  {applicants[contract._id].map((applicant) => (
                    <li key={applicant._id} className="flex items-center mb-2">
                      <FontAwesomeIcon icon={faUser} className="text-blue-500 mr-2" />
                      <span>{applicant.name} - {applicant.email}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography>No applicants yet</Typography>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CompanyContracts;
