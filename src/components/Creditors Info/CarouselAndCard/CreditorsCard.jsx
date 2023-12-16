import React from 'react'

const CreditorsCard = (props) => {
  return (
    <div className="carousel-card">
      <h2 className="not-selectable">{props.creditorName}</h2>
      <h3 className="not-selectable">Total Loan</h3>
      <h3 className="not-selectable">Rs. {props.totalLoanAmount}</h3>
      <h3 className="not-selectable">Total Paid Amount</h3>
      <h3 className="not-selectable">Rs. {props.totalPaidAmount}</h3>
      <h3 className="not-selectable">Remaining Loan</h3>
      <h3 className="not-selectable">
        Rs. {props.totalLoanAmount - props.totalPaidAmount}
      </h3>
    </div>
  );
}

export default CreditorsCard
