import React, {useState, useEffect} from "react";

const Summary = ({ username }) => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

    useEffect(() => {
    // Fetch total income
    fetch(`/api/income/${username}/total`)
      .then(res => res.json())
      .then(data => setTotalIncome(data.totalIncome || 0));

    // Fetch total expense
    fetch(`/api/expense/${username}/total`)
      .then(res => res.json())
      .then(data => setTotalExpense(data.totalExpense || 0));
  }, [username]);

  useEffect(() => {
    setBalance(totalIncome - totalExpense);
  }, [totalIncome, totalExpense]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Financial Summary of {username}</h2>
      <h3 style={{color: 'blueviolet'}}>Total Income: R{totalIncome.toFixed(2)}</h3>
      <h3 style={{color: 'red'}}>Total Expense: R{totalExpense.toFixed(2)}</h3>
      <h3>Balance: R{balance.toFixed(2)}</h3>
    </div>
  );
}

export default Summary;
