import React, { useState } from "react";
import axios from "axios";

const DailyFinanceRecorder = () => {
  const today = new Date();

  const [newFinanceTransaction, setNewFinanceTransaction] = useState({
    finance: "",
    amount: "",
    transactionType: "",
    depositor: "",
    date: today,
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
    const selectedFinance = newFinanceTransaction.finance;

    await axios
      .get(`http://localhost:8081/selected-finance/${selectedFinance}`)
      .then((res) => {
        fetchedRow = res;
      })
      .catch((err) => {
        console.log(err);
      });

    if (fetchedRow?.data?.data[0]?.finance_name === undefined) {
      let financeDoesntExist = !financeIsThere;
      console.log(financeDoesntExist);
      setFinanceIsThere(financeDoesntExist);
      form.reset();
    } else if (fetchedRow?.data?.data[0]?.finance_name !== "") {
      const financeName = fetchedRow?.data?.data[0]?.finance_name;
      const financeAmount =
        parseInt(fetchedRow?.data?.data[0]?.deposit) +
        parseInt(newFinanceTransaction.amount);
        
      const toUpdateValues = {
        toUpdateAmount: financeAmount,
        toUpdateFinance: financeName,
      };
      //record transaction in transaction table if finance exist in finance table
      await axios
        .post(
          "http://localhost:8081/record-financeTransaction",
          newFinanceTransaction
        )
        .then((res) => {
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
      form.reset();
      console.log("value is updated");

      //update balance in finance table as per transaction

      await axios
        .patch(
          `http://localhost:8081/update-finance-balance/${financeName}`,
          toUpdateValues
        )
        .then((res) => {
          // window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className="wrapper-second row-flex ">
      <form
        className="row-flex-spaced-center width-hundred daily-form col-gap-ten"
        id="finance_entry_form"
        onSubmit={submitFinanceTransactionData}
      >
        <input
          name="finance"
          type="text"
          placeholder="finance name..."
          className="not-selectable"
          onChange={handleInput}
        ></input>
        <input
          name="amount"
          type="text"
          placeholder="amount..."
          className="not-selectable"
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
