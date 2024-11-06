// src/pages/UpdateMembershipPage.jsx

import React, { useState } from 'react';

function UpdateMembershipPage({ fetchMembershipDetails, onUpdateMembership, onCancelMembership }) {
    const [membershipNumber, setMembershipNumber] = useState('');
    const [membershipDetails, setMembershipDetails] = useState(null);
    const [extensionMonths, setExtensionMonths] = useState('');

    const handleFetchDetails = async () => {
        try {
            const details = await fetchMembershipDetails(membershipNumber);
            setMembershipDetails(details);
        } catch (error) {
            console.error("Error fetching membership details:", error);
            alert("Could not fetch membership details. Please check the membership number.");
        }
    };

    const handleExtendMembership = async () => {
        const newDuration = membershipDetails.duration + parseInt(extensionMonths, 10);
        
        try {
            await onUpdateMembership(membershipNumber, { ...membershipDetails, duration: newDuration });
            alert("Membership extended successfully!");
            setMembershipDetails({ ...membershipDetails, duration: newDuration });
            setExtensionMonths('');
        } catch (error) {
            console.error("Error extending membership:", error);
            alert("Failed to extend membership. Please try again.");
        }
    };

    const handleCancelMembership = async () => {
        if (window.confirm("Are you sure you want to cancel this membership?")) {
            try {
                await onCancelMembership(membershipNumber);
                alert("Membership canceled successfully!");
                setMembershipDetails(null);
            } catch (error) {
                console.error("Error canceling membership:", error);
                alert("Failed to cancel membership. Please try again.");
            }
        }
    };

    return (
        <div className="update-membership-page">
            <h2>Update Membership</h2>
            
            {/* Fetch Membership Details */}
            <div>
                <label htmlFor="membershipNumber">Membership Number:</label>
                <input
                    type="text"
                    id="membershipNumber"
                    value={membershipNumber}
                    onChange={(e) => setMembershipNumber(e.target.value)}
                    required
                />
                <button onClick={handleFetchDetails}>Fetch Details</button>
            </div>

            {/* Display Membership Details */}
            {membershipDetails && (
                <div className="membership-details">
                    <h3>Membership Details</h3>
                    <p><strong>Name:</strong> {membershipDetails.name}</p>
                    <p><strong>Email:</strong> {membershipDetails.email}</p>
                    <p><strong>Phone:</strong> {membershipDetails.phone}</p>
                    <p><strong>Duration:</strong> {membershipDetails.duration} months</p>
                    <p><strong>Membership Type:</strong> {membershipDetails.membershipType}</p>
                    <p><strong>Fees:</strong> ${membershipDetails.fees}</p>

                    {/* Extend Membership Duration */}
                    <div>
                        <label htmlFor="extensionMonths">Extend Duration (months):</label>
                        <input
                            type="number"
                            id="extensionMonths"
                            value={extensionMonths}
                            onChange={(e) => setExtensionMonths(e.target.value)}
                            min={1}
                        />
                        <button onClick={handleExtendMembership}>Extend Membership</button>
                    </div>

                    {/* Cancel Membership */}
                    <button onClick={handleCancelMembership} className="cancel-button">Cancel Membership</button>
                </div>
            )}
        </div>
    );
}

export default UpdateMembershipPage;
