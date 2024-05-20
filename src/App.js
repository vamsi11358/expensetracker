import React, { useState, useEffect } from 'react';
import useStore from './store';
import './App.css';
import Modal from './component/modal';
import ModalAdd from './component/modalAdd';
import { Pie } from 'react-chartjs-2';


function App() {
    const walletBalance = useStore((state) => state.walletBalance);
    const expenses = useStore((state) => state.expenses);
    const transactions = useStore((state) => state.transactions);
    const addTransaction = useStore((state) => state.addTransaction);
    const editTransaction = useStore((state) => state.editTransaction);
    const deleteTransaction = useStore((state) => state.deleteTransaction);
    const [showModal, setShowModal] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [pieChartData, setPieChartData] = useState({}); // State to hold pie chart data

    useEffect(() => {
      // Calculate expenses data for the pie chart
      const categoryExpenses = transactions.reduce((acc, transaction) => {
          acc[transaction.name] = acc[transaction.name] ? acc[transaction.name] + transaction.amount : transaction.amount;
          return acc;
      }, {});

      // Convert expenses data to Chart.js format
      const pieData = {
          labels: Object.keys(categoryExpenses),
          datasets: [
              {
                  data: Object.values(categoryExpenses),
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)',
                      'rgba(255, 159, 64, 0.6)',
                  ],
              },
          ],
      };

      setPieChartData(pieData);
  }, [transactions]);

    const handleAddExpenseClick = () => {
        setShowModal(true);
    };

    const handleAdd = () => {
        setShowModalAdd(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    
    const handleCloseModalAdd = () => {
        setShowModalAdd(false);
    };

    const handleEditTransaction = (transaction) => {
        setShowModal(true);
    };

    const handleDeleteTransaction = (transactionId) => {
        deleteTransaction(transactionId);
    };

    return (
        <div className="App">
            <header className="App-header">Expense Tracker</header>
            <div className="wallet-info">
                <div className="wallet-balance">
                    Wallet Balance: <span className="amount">₹{walletBalance}</span>
                    <button className="add-income" onClick={handleAdd}>+ Add Income</button>
                </div>
                <div className="expenses">
                    Expenses: <span className="amount">₹{expenses}</span>
                    <button className="add-expense" onClick={handleAddExpenseClick}>+ Add Expense</button>
                </div>
                <div className="chart">
                    <h3>Expense Distribution</h3>
                    {/* <Pie data={pieChartData} /> */}
                </div>
            </div>
            <div className="main-content">
                <div className="transactions">
                    <h3>Recent Transactions</h3>
                    <ul className="transaction-list">
                        {transactions.map((transaction) => (
                            <li key={transaction.id} className="transaction-item">
                                <div className="transaction-name">{transaction.name}</div>
                                <div className="transaction-date">{transaction.date}</div>
                                <div className="transaction-amount">₹{transaction.amount}</div>
                                <div className="transaction-actions">
                                    <button className="edit" onClick={() => handleEditTransaction(transaction)}>✎</button>
                                    <button className="delete" onClick={() => handleDeleteTransaction(transaction.id)}>🗑</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="pagination">
                        <button className="prev">◀</button>
                        <span className="page-number">1</span>
                        <button className="next">▶</button>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onClose={handleCloseModal} addTransaction={addTransaction} editTransaction={editTransaction} />
            <ModalAdd show={showModalAdd} onClose={handleCloseModalAdd} />
        </div>
    );
}

export default App;
