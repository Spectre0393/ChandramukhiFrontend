import React, { useState } from "react";
import "./dailyexpenses.css";
import { updateExpense } from "../../utils/APIS/ExpensesAPIS";

const UpdateForm = ({ rowToUpdate }) => {
  const [updateData, setUpdateData] = useState({
    expenseDetail: "",
    price: "",
    quantity: "",
    expenderName: "",
  });

  const form = document.getElementById("expenses_update_form");

  const handleInput = (event) => {
    setUpdateData({ ...updateData, [event.target.name]: event.target.value });
  };

  const submitExpensesUpdate = async () => {
        updateExpense(rowToUpdate.fetchedRow, updateData)
          .then((res) => {
            window.location.reload(false);
          })
          .catch((err) => {
            console.log("While updating sales record", err);
          });
        form.reset();
/*     try {
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
    form.reset(); */
  };

  return (
    <div className="data-update-form col-flex-spaced-center row-gap-ten">
      <form
        id="expenses_update_form"
        className="row-flex-spaced-center col-gap-ten"
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
