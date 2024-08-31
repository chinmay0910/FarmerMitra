import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faFileAlt, faCalendarAlt, faMapMarkerAlt, faTag, faMoneyBillWave, faShieldAlt, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';

const ContractDetails = () => {
    const { contractId } = useParams(); // Get the contractId from the URL params
    const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContractDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/agreement/${contractId}`);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                setContract(data);
            } catch (error) {
                setError('Error fetching contract details');
            } finally {
                setLoading(false);
            }
        };

        fetchContractDetails();
    }, [contractId]);

    const handleApply = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/agreement/${contractId}/apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('Auth-token')
                }
            });

            if (response.ok) {
                alert('Application submitted successfully!');
            } else {
                throw new Error('Failed to apply for the contract');
            }
        } catch (error) {
            console.error('Error applying for contract:', error);
            alert('Error applying for the contract');
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            {contract && (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-4">Contract Details</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faBuilding} className="text-blue-500 mr-2" />
                            <strong className="w-1/3">Company ID:</strong>
                            <span>{contract.companyId}</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faFileAlt} className="text-blue-500 mr-2" />
                            <strong className="w-1/3">Contract Description:</strong>
                            <span>{contract.contractDescription}</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faTag} className="text-blue-500 mr-2" />
                            <strong className="w-1/3">Crop Type:</strong>
                            <span>{contract.cropType.join(', ')}</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500 mr-2" />
                            <strong className="w-1/3">Quantity Required:</strong>
                            <span>{contract.quantityRequired.join(', ')}</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faMoneyBillWave} className="text-blue-500 mr-2" />
                            <strong className="w-1/3">Price per Unit:</strong>
                            <span>{contract.pricePerUnit.join(', ')}</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faMoneyBillWave} className="text-blue-500 mr-2" />
                            <strong className="w-1/3">Total Price:</strong>
                            <span>{contract.totalprice}</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faClock} className="text-blue-500 mr-2" />
                            <strong className="w-1/3">Payment Terms:</strong>
                            <span>{contract.paymentTerms.join(', ')}</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500 mr-2" />
                            <strong className="w-1/3">Contract Duration:</strong>
                            <span>{contract.contractDuration}</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500 mr-2" />
                            <strong className="w-1/3">Delivery Schedule:</strong>
                            <span>{contract.deliverySchedule}</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 mr-2" />
                            <strong className="w-1/3">Delivery Location:</strong>
                            <span>{contract.deliveryLocation}</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faShieldAlt} className="text-blue-500 mr-2" />
                            <strong className="w-1/3">Quality Standards:</strong>
                            <span>{contract.qualityStandards}</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faShieldAlt} className="text-blue-500 mr-2" />
                            <strong className="w-1/3">Support Services Provided:</strong>
                            <span>{contract.supportServicesProvided.join(', ')}</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faShieldAlt} className="text-blue-500 mr-2" />
                            <strong className="w-1/3">Risk Mitigation Clauses:</strong>
                            <span>{contract.riskMitigationClauses.join(', ')}</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faPhone} className="text-blue-500 mr-2" />
                            <strong className="w-1/3">Contact Information:</strong>
                            <span>{contract.contactInformation.join(', ')}</span>
                        </div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500 mr-2" />
                            <strong className="w-1/3">Application Deadline:</strong>
                            <span>{new Date(contract.applicationDeadline).toLocaleDateString()}</span>
                        </div>
                    </div>

                    {contract.cropImage && (
                        <div className="mb-4">
                            <img src={`http://localhost:5000/uploads/${contract.cropImage}`} alt="Crop" className="w-full max-h-[240px] rounded-lg shadow-md"/>
                        </div>
                    )}

                    <div className="text-center">
                        <button
                            onClick={handleApply}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContractDetails;
