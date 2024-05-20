import React, { useState, useEffect } from 'react';
import './modal.css';

const Modal = ({ show, onClose, addTransaction, editTransaction, editingTransaction }) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (editingTransaction) {
            setTitle(editingTransaction.name);
            setPrice(editingTransaction.amount);
            setCategory(editingTransaction.category || ''); // assuming category is not provided in the example
            setDate(editingTransaction.date);
        } else {
            setTitle('');
            setPrice('');
            setCategory('');
            setDate('');
        }
    }, [editingTransaction]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const transaction = {
            id: editingTransaction ? editingTransaction.id : Date.now(),
            name: title,
            date,
            amount: parseInt(price),
            category,
        };
        if (editingTransaction) {
            editTransaction(transaction);
        } else {
            addTransaction(transaction);
        }
        onClose();
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{editingTransaction ? 'Edit Expense' : 'Add Expense'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Food">Food</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Travel">Travel</option>
                        </select>
                        <input
                            type="text"
                            placeholder="dd/mm/yyyy"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="add-expense-button">{editingTransaction ? 'Save Changes' : 'Add Expense'}</button>
                        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
