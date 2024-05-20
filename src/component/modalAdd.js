import React, { useState } from 'react';
import './modal.css';
import useStore from '../store'; // Update the path to your store

const ModalAdd = ({ show, onClose }) => {
    const [amount, setAmount] = useState('');

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleAddBalance = (event) => {
        event.preventDefault();
        if (!amount) return;
        const parsedAmount = parseFloat(amount);
        // Call the addTransaction action to add money and update state
        useStore.getState().addTransaction({
            id: new Date().getTime(), // Generate a unique ID for the transaction
            name: 'Income',
            date: new Date().toLocaleDateString(), // Use current date
            amount: parsedAmount,
        });
        onClose();
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Add Balance</h2>
                <form onSubmit={handleAddBalance}>
                    <div className="form-group">
                        <input 
                            type="number"
                            placeholder="Income Amount" 
                            value={amount}
                            onChange={handleAmountChange} 
                        />
                        <button type="submit" className="add-amount-button">Add Balance</button>
                        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalAdd;
