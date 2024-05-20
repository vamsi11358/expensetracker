import create from 'zustand';

const useStore = create((set) => {
    // Get initial values from localStorage or use defaults
    const initialWalletBalance = JSON.parse(localStorage.getItem('walletBalance')) || 4500;
    const initialExpenses = JSON.parse(localStorage.getItem('expenses')) || 0;

    // Calculate wallet balance
    const initialWalletBalanceAfterExpenses = initialWalletBalance - initialExpenses;

    return {
        walletBalance: initialWalletBalanceAfterExpenses,
        expenses: initialExpenses,
        transactions: JSON.parse(localStorage.getItem('transactions')) || [
            { id: 1, name: '', date: '', amount: 0 },
        ],

        addTransaction: (transaction) => set((state) => {
            const newTransactions = [...state.transactions, transaction];
            localStorage.setItem('transactions', JSON.stringify(newTransactions));
            const newExpenses = state.expenses + transaction.amount;
            localStorage.setItem('expenses', newExpenses);
            const newWalletBalance = state.walletBalance - transaction.amount;
            localStorage.setItem('walletBalance', newWalletBalance);
            return { transactions: newTransactions, expenses: newExpenses, walletBalance: newWalletBalance };
        }),

        editTransaction: (updatedTransaction) => set((state) => {
            const newTransactions = state.transactions.map(transaction =>
                transaction.id === updatedTransaction.id ? updatedTransaction : transaction
            );
            localStorage.setItem('transactions', JSON.stringify(newTransactions));
            // Update expenses accordingly
            const newExpenses = newTransactions.reduce((acc, curr) => acc + curr.amount, 0);
            localStorage.setItem('expenses', newExpenses);
            const newWalletBalance = state.walletBalance - updatedTransaction.amount;
            localStorage.setItem('walletBalance', newWalletBalance);
            return { transactions: newTransactions, expenses: newExpenses, walletBalance: newWalletBalance };
        }),

        deleteTransaction: (transactionId) => set((state) => {
            const deletedTransaction = state.transactions.find(t => t.id === transactionId);
            const newTransactions = state.transactions.filter(transaction => transaction.id !== transactionId);
            localStorage.setItem('transactions', JSON.stringify(newTransactions));
            const newExpenses = state.expenses - deletedTransaction.amount;
            localStorage.setItem('expenses', newExpenses);
            const newWalletBalance = state.walletBalance + deletedTransaction.amount;
            localStorage.setItem('walletBalance', newWalletBalance);
            return { transactions: newTransactions, expenses: newExpenses, walletBalance: newWalletBalance };
        }),

        reset: () => {
            localStorage.removeItem('walletBalance');
            localStorage.removeItem('expenses');
            localStorage.removeItem('transactions');
            set({ walletBalance: initialWalletBalanceAfterExpenses, expenses: initialExpenses, transactions: [] });
        },
    };
});

useStore.subscribe((state) => {
    localStorage.setItem('walletBalance', state.walletBalance);
    localStorage.setItem('expenses', state.expenses);
    localStorage.setItem('transactions', JSON.stringify(state.transactions));
});

export default useStore;
