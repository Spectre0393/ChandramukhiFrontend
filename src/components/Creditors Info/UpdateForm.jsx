import React, { useState } from "react";  
import '../../utils/css/daily.css'
import { updatereditorTransactions } from "../../utils/APIS/CreditorTransactionsAPIS";

const today = new Date();

const CreditorTransactionUpdateForm = ({ rowToUpdate }) => {
  const [updateData, setUpdateData] = useState({
    creditorName: "",
    depositedAmount: "",
    depositorName: "",
    transactionDate: today,
  });

  const form = document.getElementById("creditors_transaction_update_form");

  const handleInput = (event) => {
    setUpdateData({ ...updateData, [event.target.name]: event.target.value });
  };

  const submitCreditorTransactionUpdate = async () => {
    updatereditorTransactions(rowToUpdate.fetchedRow, updateData)
    ?.then((response)=>{
      window.location.reload(false);
    }).catch((error)=>{
      console.log("While updating creditor transaction record", error);
    });
    form.reset();
  };

  return (
    <div className="transaction-update-form col-flex-spaced-center row-gap-ten">
      <form
        id="creditors_transaction_update_form"
        className="input-formatter row-flex-spaced-center col-gap-ten"
      >
        <input
          name="creditorName"
          type="text"
          placeholder="enter the creditor name here..."
          onChange={handleInput}
        ></input>
        <input
          name="depositedAmount"
          type="text"
          placeholder="amount"
          onChange={handleInput}
        ></input>
        <input
          name="depositorName"
          type="text"
          placeholder="depositor name"
          onChange={handleInput}
        ></input>
      </form>
      <button className="updateBtn" onClick={submitCreditorTransactionUpdate}>
        Update Transaction
      </button>
    </div>
  );
};

export default CreditorTransactionUpdateForm;
