import React, { useState } from "react";
import "../../utils/css/daily.css";
import { updateFinanceTransactions } from "../../utils/APIS/FinanceTransactionsAPIS";

const today = new Date();

const FinanceTransactionUpdateForm = ({ rowToUpdate }) => {
  const [updateData, setUpdateData] = useState({
    financeName: "",
    depositedAmount: "",
    depositorName: "",
    transactionDate: today,
  });

  const form = document.getElementById("finance_transaction_update_form");

  const handleInput = (event) => {
    setUpdateData({ ...updateData, [event.target.name]: event.target.value });
  };

  const submitFinanceTransactionUpdate = async () => {
    updateFinanceTransactions(rowToUpdate.fetchedRow, updateData).then(
      (res) => {
        window.location.reload(false);
      }
    ).catch((err)=>{
      console.log("While updating finance transaction record", err);
    });
    form.reset();
  };

  return (
    <div className="transaction-update-form col-flex-spaced-center row-gap-ten">
      <form
        id="finance_transaction_update_form"
        className="input-formatter row-flex-spaced-center col-gap-ten"
      >
        <input
          name="financeName"
          type="text"
          placeholder="enter the finance name here..."
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
      <button
        className="general-alert-button continue-button"
        onClick={submitFinanceTransactionUpdate}
      >
        Update Transaction
      </button>
    </div>
  );
};

export default FinanceTransactionUpdateForm;
