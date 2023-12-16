import React, { useState } from "react";
import "./dailyexpenses.css";
import "../../utils/css/dailySalsesExpenses.css";
import { recordExpense } from "../../utils/APIS/ExpensesAPIS";

const DailyExpensesRecorder = () => {
  const today = new Date();

  const [expensesData, setExpensesData] = useState({
    expenseDetail: "",
    price: "",
    quantity: "",
    expenderName: "",
    transactionDate: today,
  });

  const form = document.getElementById("expense_form");

  const handleInput = (event) => {
    setExpensesData({
      ...expensesData,
      [event.target.name]: event.target.value,
    });
  };

  function submitExpensesData(event) {
    event.preventDefault();
    recordExpense(expensesData)
      ?.then(() => {
        console.log(expensesData);
        // window.location.reload(false);
      })
      .catch((error) => {
        alert("user creation failed");
        console.log("error while saving data", error);
      });

    form.reset();
  }
  return (
    <form
      id="expense_form"
      onSubmit={submitExpensesData}
      className="row-flex-spaced-center width-hundred daily-form col-gap-ten"
    >
      <input
        name="expenseDetail"
        type="text"
        placeholder="enter the expense detail here..."
        onChange={handleInput}
      ></input>
      <input
        name="price"
        type="text"
        placeholder="price"
        onChange={handleInput}
      ></input>
      <input
        name="quantity"
        type="text"
        placeholder="quantity"
        onChange={handleInput}
      ></input>
      <input
        name="expenderName"
        type="text"
        placeholder="expender name"
        onChange={handleInput}
      ></input>
      <button className="general-button submit-data-button">
        Record Expense
      </button>
    </form>
  );
};

export default DailyExpensesRecorder;
