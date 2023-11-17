import React, { useState } from "react";
import "./dailyexpenses.css";
import "../../utils/css/dailySalsesExpenses.css";
import axios from "axios";

const DailyExpensesRecorder = () => {
  const today = new Date();

  const [expensesData, setExpensesData] = useState({
    expense: "",
    price: "",
    quantity: "",
    expender: "",
    date: today,
  });

  const form = document.getElementById("expense_form");

  const handleInput = (event) => {
    setExpensesData({
      ...expensesData,
      [event.target.name]: event.target.value,
    });
  };

  async function submitExpensesData(event) {
    event.preventDefault();
    await axios
      .post("http://localhost:8081/record-expenses", expensesData)
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
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
        name="expense"
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
        name="expender"
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
