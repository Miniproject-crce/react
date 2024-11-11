import React, { useState } from 'react';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  const handleAddExpense = () => {
    if (!category || !amount || !date) return;

    const newExpense = {
      category,
      amount: parseFloat(amount),
      date: new Date(date).toLocaleDateString(),
    };

    if (editingIndex !== null) {
      const updatedExpenses = [...expenses];
      updatedExpenses[editingIndex] = newExpense;
      setExpenses(updatedExpenses);
      setEditingIndex(null);
    } else {
      setExpenses([...expenses, newExpense]);
    }

    setCategory('');
    setAmount('');
    setDate('');
  };

  const handleSetBudget = () => {
    if (!budget) return;
    setBudget(parseFloat(budget));
  };

  const handleEditExpense = (index) => {
    const expenseToEdit = expenses[index];
    setCategory(expenseToEdit.category);
    setAmount(expenseToEdit.amount.toString());
    setDate(expenseToEdit.date);
    setEditingIndex(index);
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingBudget = budget ? budget - totalExpenses : null;

  const filteredExpenses = filterCategory === 'All' 
    ? expenses 
    : expenses.filter(expense => expense.category === filterCategory);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Expense Tracker</h1>

      <div className="mb-4">
        <h2>Add/Edit Expense</h2>
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="col">
            <button className="btn btn-primary" onClick={handleAddExpense}>
              {editingIndex !== null ? 'Update Expense' : 'Add Expense'}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2>Set Monthly Budget</h2>
        <div className="form-row">
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder="Monthly Budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <div className="col">
            <button className="btn btn-success" onClick={handleSetBudget}>Set Budget</button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2>Filter Expenses by Category</h2>
        <select
          className="form-control"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Entertainment">Entertainment</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      <div>
        <h2>Expenses</h2>
        <ul className="list-group">
          {filteredExpenses.map((expense, index) => (
            <li key={index} className="list-group-item">
              <div>
                <strong>Category:</strong> {expense.category} <br />
                <strong>Amount:</strong> ${expense.amount.toFixed(2)} <br />
                <strong>Date:</strong> {expense.date}
              </div>
              <button className="btn btn-warning btn-sm" onClick={() => handleEditExpense(index)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteExpense(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {remainingBudget !== null && (
        <div className="mt-4">
          <h3>
            Total Expenses: ${totalExpenses.toFixed(2)} <br />
            Remaining Budget: ${remainingBudget.toFixed(2)}
          </h3>
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;