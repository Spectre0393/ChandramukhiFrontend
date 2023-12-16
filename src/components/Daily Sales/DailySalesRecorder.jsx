import React, { useState } from "react";
import "./dailysales.css";
import "../../utils/css/dailySalsesExpenses.css";
import { recordSale } from "../../utils/APIS/SalesAPIS";

const DailySalesRecorder = () => {
  const today = new Date();

  const [salesData, setSalesData] = useState({
    productName: "",
    price: "",
    quantity: "",
    sellerName: "",
    transactionDate: today,
  });

  const form = document.getElementById("sales_form");

  const handleInput = (event) => {
    setSalesData({ ...salesData, [event.target.name]: event.target.value });
  };

  function submitSalesData(event) {
    event.preventDefault();
    recordSale(salesData)
      ?.then(() => {
        console.log(salesData);
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
      id="sales_form"
      onSubmit={submitSalesData}
      className="row-flex-spaced-center width-hundred daily-form col-gap-ten"
    >
      <input
        name="productName"
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
        name="sellerName"
        type="text"
        placeholder="seller name"
        onChange={handleInput}
      ></input>
      <button className="general-button submit-data-button">Record Sale</button>
    </form>
  );
};

export default DailySalesRecorder;
