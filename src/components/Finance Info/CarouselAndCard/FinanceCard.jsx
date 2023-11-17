import React from 'react'

const FinanceCard = (props) => {
  return (
    <div className="carousel-card">
      <h2 className="not-selectable">{props?.finance_name}</h2>
      <h3 className="not-selectable">Available Deposit</h3>
      <h3 className="not-selectable">Rs. {props.deposit}</h3>
      <h3 className="not-selectable">Total Loan</h3>
      <h3 className="not-selectable">Rs. {props.loan}</h3>
      <h3 className="not-selectable">Remaining Balance</h3>
      <h3 className="not-selectable">Rs. {props.deposit - props.loan}</h3>
    </div>
  );
}

export default FinanceCard
