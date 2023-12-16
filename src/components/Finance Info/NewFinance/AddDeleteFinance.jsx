import React, { useState } from "react";
import "./adddeletefinance.css";

import {
  recordFinance,
  fetchAllFinances,
  deleteFinance
} from "../../../utils/APIS/FinancesAPIS";

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
    membershipDate: "",
    totalSavingAmount: "",
    loanAmount: "",
    loanStartDate: "",
    loanEndDate: "",
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
  };

  const selectOption = (event) => {
    financeToDelete = event.target.value;
  };

  const allFinances = () => {
    fetchAllFinances()
      ?.then((response) => {
        setFinancesNameList(response?.data);
        setLoading(true);
      })
      .catch((error) => {
        console.log("error while fetching finance", error);
      });
  };

  const form = document.getElementById("finances_add_form");

  const addFinance = () => {
    recordFinance(newFinanceDetails)
      ?.then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log("error while saving finance", error);
      });
    form.reset();
  };

  const initiateDelete = async () => {
    console.log("error while saving finance", financeToDelete);
    deleteFinance(financeToDelete)
      ?.then((res) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log("error while saving finance", error);
      });
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
            <div className="form-inputGroup">
              <input
                name="financeName"
                placeholder="enter new finance name here..."
                onChange={handleInput}
              ></input>
              <input
                name="membershipDate"
                placeholder="membership date (YYYY-MM-DD...)"
                onChange={handleInput}
              ></input>
              <input
                name="totalSavingAmount"
                placeholder="enter initial deposit here..."
                onChange={handleInput}
              ></input>
            </div>
            <div className="form-inputGroup">
              <input
                name="loanAmount"
                placeholder="enter initial loan here..."
                onChange={handleInput}
              ></input>
              <input
                name="loanStartDate"
                placeholder="loan start date (YYYY-MM-DD...)"
                onChange={handleInput}
              ></input>
              <input
                name="loanEndDate"
                placeholder="loan end date (YYYY-MM-DD...)"
                onChange={handleInput}
              ></input>
            </div>
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
                    value={names.financeID}
                    className="options-drop"
                    key={names.financeID}
                  >
                    {names.financeName}
                  </option>
                );
              })}
            </select>
          }
          <div className="alert-buttons">
            <button onClick={toggleShowDeleteFinanceForm}>Cancel</button>
            <button onClick={initiateDelete}>Delete Finance</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDeleteFinance;
