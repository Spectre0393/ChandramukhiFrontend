import React, { useState } from "react";  
import '../../utils/css/daily.css'
import axios from "axios";

const CreditorTransactionUpdateForm = ({ rowToUpdate }) => {
  const [updateData, setUpdateData] = useState({
    creditor: "",
    amount: "",
    transactionType: "",
    depositor: "",
  });

  const form = document.getElementById("creditors_transaction_update_form");

  const handleInput = (event) => {
    setUpdateData({ ...updateData, [event.target.name]: event.target.value });
  };

  const submitCreditorTransactionUpdate = async () => {
    try {
      await axios
        .patch(
          `http://localhost:8081/update-finance-transaction/${rowToUpdate.fetchedRow}`,
          updateData
        )
        .then((res) => {
          window.location.reload(false);
        });
    } catch (err) {
      console.log("While updating finance transaction record", err);
    }
    form.reset();
  };

  return (
    <div className="transaction-update-form col-flex-spaced-center row-gap-ten">
      <form
        id="creditors_transaction_update_form"
        className="input-formatter row-flex-spaced-center col-gap-ten"
      >
        <input
          name="creditor"
          type="text"
          placeholder="enter the creditor name here..."
          onChange={handleInput}
        ></input>
        <input
          name="amount"
          type="text"
          placeholder="amount"
          onChange={handleInput}
        ></input>
        <select
          name="transactionType"
          className="dropdown-option not-selectable"
          required
          onChange={handleInput}
        >
          <option value="" hidden>
            Select your option
          </option>
          <option value="Deposit">Deposit</option>
          <option value="Loan">Loan</option>
        </select>
        <input
          name="depositor"
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
