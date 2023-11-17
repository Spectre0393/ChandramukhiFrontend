import React, { useState } from "react";
import "./dailysales.css";
import "../../utils/css/dailySalsesExpenses.css";
import axios from "axios";

const DailySalesRecorder = () => {
  const today = new Date();

  const [salesData, setSalesData] = useState({
    product: "",
    price: "",
    quantity: "",
    seller: "",
    date: today,
  });

  const form = document.getElementById("sales_form");

  const handleInput = (event) => {
    setSalesData({ ...salesData, [event.target.name]: event.target.value });
  };

  async function submitSalesData(event) {
    event.preventDefault();
    await axios
      .post("http://localhost:8081/record-sales", salesData)
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
      id="sales_form"
      onSubmit={submitSalesData}
      className="row-flex-spaced-center width-hundred daily-form col-gap-ten"
    >
      <input
        name="product"
        type="text"
        placeholder="enter the product name here..."
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
        name="seller"
        type="text"
        placeholder="seller name"
        onChange={handleInput}
      ></input>
      <button className="general-button submit-data-button">Record Sale</button>
    </form>
  );
};

export default DailySalesRecorder;
