import React, { useState } from "react";
import axios from "axios";

const DailyCreditorRecorder = () => {
  const today = new Date();

  const [newCreditorTransaction, setNewCreditorTransaction] = useState({
    creditor: "",
    amount: "",
    transactionType: "",
    paidBy: "",
    date: today,
  });

  const form = document.getElementById("creditor_entry_form");

  const handleInput = (event) => {
    setNewCreditorTransaction({
      ...newCreditorTransaction,
      [event.target.name]: event.target.value,
    });
  };

  //to update the daily finance transaction in finances table start

  const [creditorIsThere, setCreditorIsThere] = useState(false);

  const hideCreditorDoesntExist = () => {
    setCreditorIsThere(false);
  };

  async function submitCreditorTransactionData(event) {
    event.preventDefault();
    let fetchedRow;
    const selectedCreditor = newCreditorTransaction.creditor;

    await axios
      .get(`http://localhost:8081/selected-creditor/${selectedCreditor}`)
      .then((res) => {
        fetchedRow = res;
      })
      .catch((err) => {
        console.log(err);   
      });

    if (fetchedRow?.data?.data[0]?.creditors_name === undefined) {

      let creditorDoesntExist = !creditorIsThere;
      setCreditorIsThere(creditorDoesntExist);
      form.reset();
    } else if (fetchedRow?.data?.data[0]?.creditors_name !== "") { 
      const creditorName = fetchedRow?.data?.data[0]?.creditors_name;
      const paidAmount =
        parseInt(fetchedRow?.data?.data[0]?.debit_amount) +
        parseInt(newCreditorTransaction.amount);

      const toUpdateValues = {
        toUpdateAmount: paidAmount,
        toUpdateCreditor: creditorName,
      };
      //record transaction in transaction table if creditor exist in creditors table
      await axios
        .post(
          "http://localhost:8081/record-creditorTransaction",
          newCreditorTransaction
        )
        .then((res) => {
        })
        .catch((err) => {
          console.log(err);
        });
      form.reset();
      //update balance in creditors table as per transaction

      await axios
        .patch(
          `http://localhost:8081/update-creditors-balance/${creditorName}`,
          toUpdateValues
        )
        .then((res) => {
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
          name="creditor"
          placeholder="creditor's  name..."
          className="not-selectable"
          onChange={handleInput}
        ></input>
        <input
          type="text"
          name="amount"
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
          <option value="Loan Payment">Loan Payment</option>
        </select>

        <input
          type="text"
          name="paidBy"
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
