import React, { useState } from "react";
import {
  fetchFinanceByName,
} from "../../utils/APIS/FinancesAPIS";
import { recordFinanceTransactions } from "../../utils/APIS/FinanceTransactionsAPIS";

const DailyFinanceRecorder = () => {
  const today = new Date();

  const [newFinanceTransaction, setNewFinanceTransaction] = useState({
    financeName: "",
    depositedAmount: "",
    depositorName: "",
    transactionDate: today,
  });

  const form = document.getElementById("finance_entry_form");

  const handleInput = (event) => {
    setNewFinanceTransaction({
      ...newFinanceTransaction,
      [event.target.name]: event.target.value,
    });
  };

  //to update the daily finance transaction in finances table start

  const [financeIsThere, setFinanceIsThere] = useState(false);
  const hideFinanceDoesntExist = () => {
    setFinanceIsThere(false);
  };

  async function submitFinanceTransactionData(event) {
    event.preventDefault();
    let fetchedRow;
    const selectedFinance = newFinanceTransaction.financeName;
    console.log("finance name", selectedFinance);

    fetchFinanceByName(selectedFinance).then((response) => {
      fetchedRow = response?.data;
      console.log("fetchedRow:", fetchedRow);
      if (fetchedRow?.financeName === undefined) {
        let financeDoesntExist = !financeIsThere;
        console.log("finance status:", financeDoesntExist);
        setFinanceIsThere(financeDoesntExist);
        form.reset();
      } else if (fetchedRow?.financeName !== "") {
        console.log("to save transaction:", newFinanceTransaction);
        recordFinanceTransactions(newFinanceTransaction);
      }
      form.reset();
      window.location.reload(false);
    });
  }

  return (
    <div className="wrapper-second row-flex ">
      <form
        className="row-flex-spaced-center width-hundred daily-form col-gap-ten"
        id="finance_entry_form"
        onSubmit={submitFinanceTransactionData}
      >
        <input
          name="financeName"
          type="text"
          placeholder="finance name..."
          className="not-selectable"
          onChange={handleInput}
        ></input>
        <input
          name="depositedAmount"
          type="text"
          placeholder="amount..."
          className="not-selectable"
          onChange={handleInput}
        ></input>
        <input
          name="depositorName"
          type="text"
          placeholder="deposited by..."
          className="not-selectable"
          onChange={handleInput}
        ></input>

        <button className="general-button submit-data-button">
          Record
          <br />
          Transaction
        </button>
      </form>
      {financeIsThere && (
        <div className="notification-alert col-flex-spaced-center">
          <p>Finance doesn't exist in table. Please add the finance first.</p>
          <button
            className="general-alert-button ok-button"
            onClick={hideFinanceDoesntExist}
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default DailyFinanceRecorder;
