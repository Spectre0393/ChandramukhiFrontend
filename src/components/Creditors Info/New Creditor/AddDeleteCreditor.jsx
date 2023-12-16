import React, { useState } from "react";
import "./addDeleteCreditor.css";

import {recordCreditor, fetchAllCreditors, deleteCreditor} from '../../../utils/APIS/CreditorsAPIS'

const AddDeleteCreditor = () => {
  let toggle;
  let creditorToDelete;
  const [alertAdd, setAlertAdd] = useState(false);
  const [alertDelete, setAlertDelete] = useState(false);
  const [showNewCreditorForm, setShowNewCreditorForm] = useState(false);
  const [showDeleteCreditoreForm, setShowDeleteCreditorForm] = useState(false);
  const [creditorsNameList, setCreditorsNameList] = useState();
  const [loading, setLoading] = useState(false);
  const [newCreditorDetails, setNewCreditorDetails] = useState({
    creditorName: "",
    totalLoanAmount: "",
    totalPaidAmount: "",
    loanStartDate: "",
    loanEndDate: "",
  });

  const toggleAlertAdd = () => {
    setShowNewCreditorForm(false);
    toggle = !alertAdd;
    setAlertAdd(toggle);
  };

  const toggleAlertDelete = () => {
    allCreditors();
    toggle = !alertDelete;
    setAlertDelete(toggle);
  };

  const toggleShowNewCreditorForm = () => {
    setAlertAdd(false);
    toggle = !showNewCreditorForm;
    setShowNewCreditorForm(toggle);
  };

  const toggleShowDeleteCreditorForm = () => {
    setAlertDelete(false);
    toggle = !showDeleteCreditoreForm;
    setShowDeleteCreditorForm(toggle);
  };

  const handleInput = (event) => {
    setNewCreditorDetails({
      ...newCreditorDetails,
      [event.target.name]: event.target.value,
    });
    console.log(newCreditorDetails);
  };

  const selectOption = (event) => {
    creditorToDelete = event.target.value;
  };

  // useEffect(() => {
  const allCreditors = () => {
    fetchAllCreditors()
      ?.then((response) => {
        setCreditorsNameList(response?.data);
        setLoading(true);
      })
      .catch((error) => {
        console.log("error while fetching creditors", error);
      });
  };

  const form = document.getElementById("finances_add_form");

  const addCreditor = () => {
      recordCreditor(newCreditorDetails)
        ?.then(() => {
          window.location.reload(false);
        })
        .catch((error) => {
          console.log("error while saving finance", error);
        });
      form.reset();
  };

  const initiateDeletion = () => {
     deleteCreditor(creditorToDelete)
       ?.then((res) => {
         window.location.reload(false);
       })
       .catch((error) => {
         console.log("error while deleting creditors", error);
       });
  };

  return (
    <div className="add-delete-finance-wrapper">
      <div className="btn-group">
        <button onClick={toggleAlertAdd}>Add Creditor</button>
        <button onClick={toggleAlertDelete}>Delete Creditor</button>
      </div>
      {alertAdd && (
        <div className="alert-notification">
          <p>Continue to add a new creditor?</p>
          <div className="alert-buttons">
            <button onClick={toggleAlertAdd}>Cancel</button>
            <button onClick={toggleShowNewCreditorForm}>Continue</button>
          </div>
        </div>
      )}

      {showNewCreditorForm && (
        <div className="new-finance-form-wrapper">
          <h2>New Creditor Details</h2>
          <form id="finances_add_form" className="new-finance-form">
            <div className="inputGroup">
              <input
                name="creditorName"
                placeholder="enter new creditor name here..."
                onChange={handleInput}
              ></input>
              <input
                name="totalLoanAmount"
                placeholder="enter total loan here..."
                onChange={handleInput}
              ></input>
            </div>
            <div className="inputGroup">
              <input
                name="loanStartDate"
                placeholder="enter loan start date here..."
                onChange={handleInput}
              ></input>
              <input
                name="loanEndDate"
                placeholder="enter loan end date here..."
                onChange={handleInput}
              ></input>
            </div>
          </form>
          <div className="alert-buttons">
            <button onClick={toggleShowNewCreditorForm}>Cancel</button>
            <button onClick={addCreditor}>Add Creditor</button>
          </div>
        </div>
      )}

      {alertDelete && (
        <div className="alert-notification">
          <p>Continue to delete a creditor?</p>
          <div className="alert-buttons">
            <button onClick={toggleAlertDelete}>Cancel</button>
            <button onClick={toggleShowDeleteCreditorForm}>Continue</button>
          </div>
        </div>
      )}

      {loading && showDeleteCreditoreForm && (
        <div className="delete-finance">
          <h2>Select Creditor To Delete</h2>

          <option value="" hidden>
            Select your option
          </option>
          {
            <select
              name="deleteCreditor"
              className="delete-dropdown-option not-selectable"
              required
              onChange={selectOption}
            >
              {creditorsNameList.map((names) => {
                return (
                  <option
                    value={names.creditorsID}
                    className="options-drop"
                    key={names.creditorsID}
                  >
                    {names.creditorName}
                  </option>
                );
              })}
            </select>
          }
          <div className="alert-buttons">
            <button onClick={toggleShowDeleteCreditorForm}>Cancel</button>
            <button onClick={initiateDeletion}>Delete Finance</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDeleteCreditor;
