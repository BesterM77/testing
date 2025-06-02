import React from 'react';

const Menu = ({ username }) => {

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Hello {username}, Welcome to a Balancesheet Calculator site</h1>
      <h3>This site helps you manage your finances effectively.</h3>
      <br />
    
      <p>To get started, please select an option from the Navigation Panel.</p>

      <p style={{ fontWeight: 'bold', color: 'red' }}>Note: if you have already inserted your income and expenses, you can view your summary directly.</p>

      <p>Navigate to the Income page to track your earnings.</p>
      
      <p>Navigate to the Expenses page to track your expenses.</p>
      
      <p>Finally, navigate to the Summary page to view your overall financial status.</p>
      <br />
      <p style={{ color: 'blue' }}><b>Thank you for using our site!</b></p>
    </div>
  );
}

export default Menu;
