import React, { useState, useEffect } from 'react';

function FinePaymentPage({ overdueFine, onSubmitPayment }) {
    // Local state for managing input fields
    const [paymentAmount, setPaymentAmount] = useState('');
    const [remarks, setRemarks] = useState('');
    const [isFinePaid, setIsFinePaid] = useState(false);

    // Fetch fine details when component mounts
    useEffect(() => {
        if (overdueFine && overdueFine.amount > 0) {
            setIsFinePaid(false); // Ensure fine is not paid initially
        }
    }, [overdueFine]);

    const handlePaymentChange = (e) => {
        setPaymentAmount(e.target.value);
    };

    const handleRemarksChange = (e) => {
        setRemarks(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (paymentAmount < overdueFine.amount) {
            alert("Please enter the full fine amount.");
            return;
        }

        // Call the parent function to mark fine as paid and return book
        onSubmitPayment({ amount: paymentAmount, remarks });
        setIsFinePaid(true);
    };

    return (
        <div className="fine-payment-page">
            <h2>Fine Payment</h2>
            {overdueFine && overdueFine.amount > 0 ? (
                <div>
                    <p><strong>Overdue Fine:</strong> ${overdueFine.amount}</p>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="paymentAmount">Payment Amount:</label>
                            <input
                                type="number"
                                id="paymentAmount"
                                value={paymentAmount}
                                onChange={handlePaymentChange}
                                required
                                min={overdueFine.amount}
                            />
                        </div>
                        <div>
                            <label htmlFor="remarks">Remarks (optional):</label>
                            <textarea
                                id="remarks"
                                value={remarks}
                                onChange={handleRemarksChange}
                            />
                        </div>
                        <button type="submit" disabled={isFinePaid}>Submit Payment</button>
                    </form>
                </div>
            ) : (
                <p>No pending fines. You may proceed with the return.</p>
            )}
        </div>
    );
}

export default FinePaymentPage;
