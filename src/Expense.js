import React, { useState } from "react";

const Expense = ({ username }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);

  const handleCalculate = async (event) => {
    event.preventDefault();
    const rent = parseFloat(event.target.rent.value);
    const groceries = parseFloat(event.target.groceries.value);
    const loans = parseFloat(event.target.loans.value);
    const utilities = parseFloat(event.target.utilities.value);
    const otherExpenses = parseFloat(event.target.otherExpenses.value);

    if (isNaN(rent) || isNaN(groceries) || isNaN(utilities) || isNaN(loans) || isNaN(otherExpenses)) {
      alert("Please enter valid numbers for all fields.");
      setError("Please enter valid numbers for all fields.");
      setSuccess("");
      setTotalExpense(null);
      return;
    }

    const total = rent + groceries + utilities + loans + otherExpenses;
    setTotalExpense(total);

    // Send to backend
     try {
      const res = await fetch('/api/expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username, // Pass the logged-in user's username
          rent,
          groceries,
          loans,
          utilities,
          otherExpenses,
          totalExpense
        }),
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setSuccess('Expense saved successfully!');
        setError('');
      } else {
        setError(data.error || 'Failed to save expense');
        setSuccess('');
      }
    } catch {
      setError('Network error');
      setSuccess('');
    } 
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Please enter your Expenses {username}</h2>
      <form onSubmit={handleCalculate}>
        <div>
          <label for="rent">Rent:</label>
          <input type="number" name="rent" required />
          <label for="groceries">Groceries:</label>
          <input type="number" name="groceries" required />
        </div>
        <br />
        <div>
          <label for="loans">Loans:</label>
          <input type="number" name="loans" required />
          <label for="utilities">Utilities:</label>
          <input type="number" name="utilities" required />
        </div>
        <br />
        <div>
          <label for="otherExpenses">Other Expenses:</label>
          <input type="number" name="otherExpenses" required />
        </div>
        <br />
        <p>Click Submit to calculate your total expenses.</p>
        <br />
        <button type="submit">Submit</button>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {totalExpense !== null && (
            <p style={{ color: 'red' }}>Your Total Expenses: R{totalExpense}</p>
        )}
        </form>
    </div>
    );
};

export default Expense;