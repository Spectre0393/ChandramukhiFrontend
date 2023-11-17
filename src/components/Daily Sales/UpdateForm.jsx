import React, { useState } from "react";
import axios from "axios";

const UpdateForm = ({ rowToUpdate }) => {
  const [updateData, setUpdateData] = useState({
    product: "",
    price: "",
    quantity: "",
    seller: "",
  });

  const form = document.getElementById("update_form");

  const handleInput = (event) => {
    setUpdateData({ ...updateData, [event.target.name]: event.target.value });
  };

  const submitSalesUpdate = async () => {
    try {
      await axios
        .patch(
          `http://localhost:8081/update-sale/${rowToUpdate.fetchedRow}`,
          updateData
        )
        .then((res) => {
          window.location.reload(false);
        });
    } catch (err) {
      console.log("While updating sales record", err);
    }
    form.reset();
  };

  return (
    <div className="data-update-form col-flex-spaced-center row-gap-ten">
      <form id="update_form" className="row-flex-spaced-center col-gap-ten">
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
      </form>
      <button
        className="general-alert-button continue-button"
        onClick={submitSalesUpdate}
      >
        Update Sale
      </button>
    </div>
  );
};

export default UpdateForm;
