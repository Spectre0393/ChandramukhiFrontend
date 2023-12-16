import React from "react";

const FinanceCard = (props) => {
  return (
    <div className="carousel-card">
      <h2 className="not-selectable">{props?.financeName}</h2>
      <h3 className="not-selectable">Available Deposit</h3>
      <h3 className="not-selectable">Rs. {props.totalSavingAmount}</h3>
      <h3 className="not-selectable">Total Loan</h3>
      <h3 className="not-selectable">Rs. {props.loanAmount}</h3>
      <h3 className="not-selectable">Remaining Balance</h3>
      <h3 className="not-selectable">
        Rs. {props.totalSavingAmount - props.loanAmount}
      </h3>
    </div>
  );
};

export default FinanceCard;
