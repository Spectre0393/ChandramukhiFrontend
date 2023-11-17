import React, { useState } from "react";
import "./dailyexpenses.css";
import axios from "axios";

const UpdateForm = ({ rowToUpdate }) => {
  const [updateData, setUpdateData] = useState({
    expense: "",
    price: "",
    quantity: "",
    expender: "",
  });

  const form = document.getElementById("expenses_update_form");

  const handleInput = (event) => {
    setUpdateData({ ...updateData, [event.target.name]: event.target.value });
  };

  const submitExpensesUpdate = async () => {
    try {
      await axios
        .patch(
          `http://localhost:8081/update-expense/${rowToUpdate.fetchedRow}`,
          updateData
        )
        .then((res) => {
          window.location.reload(false);
        });
    } catch (err) {
      console.log("While updating expenses record", err);
    }
    form.reset();
  };

  return (
    <div className="data-update-form col-flex-spaced-center row-gap-ten">
      <form id="expenses_update_form" className="row-flex-spaced-center col-gap-ten">
        <input
          name="product"
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
          name="seller"
          type="text"
          placeholder="expender name"
          onChange={handleInput}
        ></input>
      </form>
      <button
        className="general-alert-button continue-button"
        onClick={submitExpensesUpdate}
      >
        Update Expense
      </button>
    </div>
  );
};

export default UpdateForm;
