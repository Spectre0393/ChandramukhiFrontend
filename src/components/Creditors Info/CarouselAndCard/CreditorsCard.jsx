import React from 'react'

const CreditorsCard = (props) => {
  return (
    <div className="carousel-card">
      <h2 className="not-selectable">{props.name}</h2>
      <h3 className="not-selectable">Total Loan</h3>
      <h3 className="not-selectable">Rs. {props.totalLoan}</h3>
      <h3 className="not-selectable">Total Paid Amount</h3>
      <h3 className="not-selectable">Rs. {props.paidTillDate}</h3>
      <h3 className="not-selectable">Remaining Loan</h3>
      <h3 className="not-selectable">Rs. {props.remainingLoan}</h3>
    </div>
  );
}

export default CreditorsCard
