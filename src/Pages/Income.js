import React, { useState } from 'react';

const Income = ({ username }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [totalIncome, setTotalIncome] = useState(0);

  const handleCalculate = async (event) => {
    event.preventDefault();
    const salary = parseFloat(event.target.salary.value);
    const business = parseFloat(event.target.business.value);
    const grant = parseFloat(event.target.grant.value);
    const otherIncome = parseFloat(event.target.otherIncome.value);

    if (isNaN(salary) || isNaN(business) || isNaN(grant) || isNaN(otherIncome)) {
      alert("Please enter valid numbers for all fields.");
      setError("Please enter valid numbers for all fields.");
      setSuccess('');
      setTotalIncome(null);
      return;
    }

    const total = salary + business + grant + otherIncome;
    setTotalIncome(total);

    // Send to backend
    try {
      const res = await fetch('/api/income', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username, // Pass the logged-in user's username
          salary,
          business,
          grant,
          otherIncome,
          totalIncome
        }),
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setSuccess('Income saved successfully!');
        setError('');
      } else {
        setError(data.error || 'Failed to save income');
        setSuccess('');
      }
    } catch {
      setError('Network error');
      setSuccess('');
    } 
  };
  

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Please enter your Income {username}</h2>
       <form onSubmit={handleCalculate}>
        <div>
        <label for="salary">Salary:</label>
        <input type="number" id="salary" name="salary" placeholder="Enter your salary" required />
        <label for="business">Business Profit:</label>
        <input type="number" id="business" name="business" placeholder="Enter your business income" required />
        </div>
        <br />
        <div>
        <label for="grant">Grants:</label>
        <input type="number" id="grant" name="grant" placeholder="Enter your grants" required />
        <label for="otherIncome">Other Income:</label>
        <input type="number" id="otherIncome" name="otherIncome" placeholder="Enter your other income" required />
        </div>
        <br />
        <p>Click Submit to calculate your total income.</p>
        <button type="submit">Submit</button>
        <br />
        {totalIncome !== null && (
        <p style={{ color: 'blue'}}>Your total income is: R{totalIncome}</p>
        )}
       </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      {success && <p style={{color:'green'}}>{success}</p>}
      
    </div>
  );
};

export default Income;
