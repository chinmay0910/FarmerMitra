import React, { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UpcomingContracts = () => {
    const [contracts, setContracts] = useState([]);
    const [userId, setUserId] = useState('');
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredContracts, setFilteredContracts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchContracts();
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/getuser', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('Auth-token')
                },
            });
            if (response.ok) {
                const json = await response.json();
                setUserId(json._id);
            } else {
                throw new Error('Failed to get user data');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

    const fetchContracts = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/agreement");
            if (response.ok) {
                const data = await response.json();
                setContracts(data);
            } else {
                throw new Error("Failed to fetch contracts");
            }
        } catch (error) {
            console.error("Error fetching contracts:", error);
        }
    };

    const handleRSVP = async (contractId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/events/${contractId}/rsvp`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("Auth-token")
                }
            });
            if (response.ok) {
                // Refresh contracts after successful RSVP
                fetchContracts();
            } else {
                throw new Error('Failed to RSVP');
            }
        } catch (error) {
            console.error('Error RSVPing to contract:', error);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        filterContracts(e.target.value);
    };

    const filterContracts = (query) => {
        const filtered = contracts.filter((contract) =>
            contract.contractDescription.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredContracts(filtered);
    };

    const handleContractClick = (contractId) => {
        navigate(`/agreement/${contractId}`);
    };

    const contractsToDisplay = searchQuery ? filteredContracts : contracts;

    return (
        <div className="mt-8 mx-8">
            <input
                type="text"
                placeholder="Search contracts..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="border border-gray-300 rounded-md p-2 mb-4 w-full"
            />
            {contractsToDisplay.map((contract, index) => (
                <div key={index} className="flex flex-col border-2 rounded-2xl p-4 my-8" onClick={() => handleContractClick(contract._id)}>
                    <div className="flex md:flex-row flex-col items-center">
                        <div className="md:w-1/4 mb-4 flex justify-center items-center">
                            <img
                                src={`http://localhost:5000/uploads/${contract.cropImage}`} // Adjust the URL according to your backend image storage
                                alt={contract.cropType.join(', ')}
                                className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                            />
                        </div>
                        <div className="md:w-3/4">
                            <Typography variant="h5" gutterBottom>
                                {contract.contractDescription}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {new Date(contract.createdAt).toLocaleDateString()} - {new Date(contract.applicationDeadline).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body1">{contract.supportServicesProvided.join(', ')}</Typography>

                            {/* Display company information */}
                            <Typography variant="h6" gutterBottom>
                                Company Details
                            </Typography>
                            <Typography variant="body1">
                                Company Name: {contract.companyId.companyName}
                            </Typography>
                            <Typography variant="body1">
                                Registration No: {contract.companyId.companyRegistrationNo}
                            </Typography>
                            <Typography variant="body1">
                                Location: {contract.companyId.companyInfo}
                            </Typography>

                            <Button
                                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => handleRSVP(contract._id)}
                            >
                                {/* Show 'Registered' if the user already RSVP'd */}
                                {/* {contract.registeredFarmers.includes(userId) ? 'Registered' : 'RSVP'} */}
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UpcomingContracts;
