import React, { useState } from "react";
import { recordCreditorTransactions } from "../../utils/APIS/CreditorTransactionsAPIS";
import { fetchCreditorByName } from "../../utils/APIS/CreditorsAPIS";

const DailyCreditorRecorder = () => {
  const today = new Date();

  const [newCreditorTransaction, setNewCreditorTransaction] = useState({
    creditorName: "",
    depositedAmount: "",
    depositorName: "",
    transactionDate: today,
  });

  const form = document.getElementById("creditor_entry_form");

  const handleInput = (event) => {
    setNewCreditorTransaction({
      ...newCreditorTransaction,
      [event.target.name]: event.target.value,
    });
    console.log(newCreditorTransaction);
  };

  //to update the daily creditor transaction in creditor table start

  const [creditorIsThere, setCreditorIsThere] = useState(false);

  const hideCreditorDoesntExist = () => {
    setCreditorIsThere(false);
  };

  async function submitCreditorTransactionData(event) {
    event.preventDefault();
    let fetchedRow;
    const selectedCreditor = newCreditorTransaction.creditorName;
    console.log("creditor name", selectedCreditor);

    fetchCreditorByName(selectedCreditor)?.then((response) => {
      fetchedRow = response?.data;
      console.log("fetchedRow:", fetchedRow);
      if (fetchedRow?.creditorName === undefined) {
        let creditorDoesntExist = !creditorIsThere;
        console.log("creditor status:", creditorDoesntExist);
        setCreditorIsThere(creditorDoesntExist);
        form.reset();
      } else if (fetchedRow?.creditorName !== "") {
        console.log("to save transaction:", newCreditorTransaction);
        recordCreditorTransactions(newCreditorTransaction);
      }
      form.reset();
      window.location.reload(false);
    });
  }

  return (
    <div className="wrapper-second row-flex">
      <form
        className="row-flex-spaced-center width-hundred daily-form col-gap-ten"
        id="creditor_entry_form"
        onSubmit={submitCreditorTransactionData}
      >
        <input
          type="text"
          name="creditorName"
          placeholder="creditor's  name..."
          className="not-selectable"
          onChange={handleInput}
        ></input>
        <input
          type="text"
          name="depositedAmount"
          placeholder="amount..."
          className="not-selectable"
          onChange={handleInput}
        ></input>

        <input
          type="text"
          name="depositorName"
          placeholder="depositor's  name..."
          className="not-selectable"
          onChange={handleInput}
        ></input>

        <button className="general-button submit-data-button">
          Record
          <br />
          Transaction
        </button>
      </form>
      {creditorIsThere && (
        <div className="notification-alert col-flex-spaced-center">
          <p>Creditor doesn't exist in table. Please add the creditor first.</p>
          <button
            className="general-alert-button ok-button"
            onClick={hideCreditorDoesntExist}
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default DailyCreditorRecorder;
