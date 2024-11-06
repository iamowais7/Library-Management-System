import React, { useState } from 'react';

function AddMembershipPage({ onAddMembership }) {
    // State for each form field
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [duration, setDuration] = useState(6); // Default duration is 6 months
    const [membershipType, setMembershipType] = useState('Standard');
    const [fees, setFees] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newMembership = {
            name,
            email,
            phone,
            duration,
            membershipType,
            fees,
        };

        try {
            // Call the parent function or send a POST request to add the membership
            await onAddMembership(newMembership); // Or replace with a POST request to backend API
            alert("Membership added successfully!");
            // Reset form fields after successful submission
            setName('');
            setEmail('');
            setPhone('');
            setDuration(6);
            setMembershipType('Standard');
            setFees('');
        } catch (error) {
            console.error("Error adding membership:", error);
            alert("Failed to add membership. Please try again.");
        }
    };

    return (
        <div className="add-membership-page">
            <h2>Add New Membership</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="duration">Duration (months):</label>
                    <input
                        type="number"
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                        min={1}
                    />
                </div>
                <div>
                    <label htmlFor="membershipType">Membership Type:</label>
                    <select
                        id="membershipType"
                        value={membershipType}
                        onChange={(e) => setMembershipType(e.target.value)}
                        required
                    >
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                        <option value="VIP">VIP</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="fees">Membership Fees:</label>
                    <input
                        type="number"
                        id="fees"
                        value={fees}
                        onChange={(e) => setFees(e.target.value)}
                        required
                        min={0}
                    />
                </div>
                <button type="submit">Add Membership</button>
            </form>
        </div>
    );
}

export default AddMembershipPage;
