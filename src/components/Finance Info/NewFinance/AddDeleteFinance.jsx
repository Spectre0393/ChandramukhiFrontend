import React, { useState } from "react";
import "./adddeletefinance.css";
import axios from "axios";

const AddDeleteFinance = () => {
  let toggle;
  let financeToDelete;
  const [alertAdd, setAlertAdd] = useState(false);
  const [alertDelete, setAlertDelete] = useState(false);
  const [showNewFinanceForm, setShowNewFinanceForm] = useState(false);
  const [showDeleteFinanceForm, setShowDeleteFinanceForm] = useState(false);
  const [financesNameList, setFinancesNameList] = useState();
  const [loading, setLoading] = useState(false);
  const [newFinanceDetails, setNewFinanceDetails] = useState({
    financeName: "",
    initialDeposit: "",
    initialLoan: "",
  });

  const toggleAlertAdd = () => {
    setShowNewFinanceForm(false);
    toggle = !alertAdd;
    setAlertAdd(toggle);
  };

  const toggleAlertDelete = () => {
    allFinances();
    toggle = !alertDelete;
    setAlertDelete(toggle);
  };

  const toggleShowNewFinanceForm = () => {
    setAlertAdd(false);
    toggle = !showNewFinanceForm;
    setShowNewFinanceForm(toggle);
  };

  const toggleShowDeleteFinanceForm = () => {
    setAlertDelete(false);
    toggle = !showDeleteFinanceForm;
    setShowDeleteFinanceForm(toggle);
  };

  const handleInput = (event) => {
    setNewFinanceDetails({
      ...newFinanceDetails,
      [event.target.name]: event.target.value,
    });
    console.log(newFinanceDetails);
  };

  const selectOption = (event) => {
    financeToDelete = event.target.value;
    console.log(financeToDelete);
  };

  // useEffect(() => {
  const allFinances = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/all-finances-list"
      );
      console.log(response?.data.data);
      setFinancesNameList(response?.data.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };
  /*     allFinances();
  }, []); */

  const form = document.getElementById("finances_add_form");

  const addFinance = async () => {
    await axios
      .post("http://localhost:8081/add-finance", newFinanceDetails)
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
    form.reset();
  };

    const deleteFinance = async () => {
      try {
        await axios
          .delete(`http://localhost:8081/delete-finance/${financeToDelete}`)
          .then((res) => {
            window.location.reload(false);
          });
      } catch (err) {
        console.log("While deleting finance", err);
      }
    };

  return (
    <div className="add-delete-finance-wrapper">
      <div className="btn-group">
        <button onClick={toggleAlertAdd}>Add Finance</button>
        <button onClick={toggleAlertDelete}>Delete Finance</button>
      </div>
      {alertAdd && (
        <div className="alert-notification">
          <p>Continue to add a new finance?</p>
          <div className="alert-buttons">
            <button onClick={toggleAlertAdd}>Cancel</button>
            <button onClick={toggleShowNewFinanceForm}>Continue</button>
          </div>
        </div>
      )}

      {showNewFinanceForm && (
        <div className="new-finance-form-wrapper">
          <h2>New Finance Details</h2>
          <form id="finances_add_form" className="new-finance-form">
            <input
              name="financeName"
              placeholder="enter new finance name here..."
              onChange={handleInput}
            ></input>
            <input
              name="initialDeposit"
              placeholder="enter initial deposit here..."
              onChange={handleInput}
            ></input>
            <input
              name="initialLoan"
              placeholder="enter initial loan here..."
              onChange={handleInput}
            ></input>
          </form>
          <div className="alert-buttons">
            <button onClick={toggleShowNewFinanceForm}>Cancel</button>
            <button onClick={addFinance}>Add Finance</button>
          </div>
        </div>
      )}

      {alertDelete && (
        <div className="alert-notification">
          <p>Continue to delete a finance?</p>
          <div className="alert-buttons">
            <button onClick={toggleAlertDelete}>Cancel</button>
            <button onClick={toggleShowDeleteFinanceForm}>Continue</button>
          </div>
        </div>
      )}

      {loading && showDeleteFinanceForm && (
        <div className="delete-finance">
          <h2>Select Finance To Delete</h2>

          <option value="" hidden>
            Select your option
          </option>
          {
            <select
              name="deleteFinance"
              className="delete-dropdown-option not-selectable"
              required
              onChange={selectOption}
            >
              {financesNameList.map((names) => {
                return (
                  <option
                    value={names.finance_name}
                    className="options-drop"
                    key={names.finance_name}
                  >
                    {names.finance_name}
                  </option>
                );
              })}
            </select>
          }
          <div className="alert-buttons">
            <button onClick={toggleShowDeleteFinanceForm}>Cancel</button>
            <button onClick={deleteFinance}>Delete Finance</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDeleteFinance;
