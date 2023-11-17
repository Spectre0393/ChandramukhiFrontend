import React, { useState } from "react";
import "./addDeleteCreditor.css";
import axios from "axios";

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
    initialDeposit: "",
    initialLoan: "",
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
    console.log('we in here')
    creditorToDelete = event.target.value;
    console.log(creditorToDelete);
  };

  // useEffect(() => {
  const allCreditors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/all-creditors-list"
      );
      console.log(response?.data.data);
      setCreditorsNameList(response?.data.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };
  /*     allFinances();
  }, []); */

  const form = document.getElementById("finances_add_form");

  const addCreditor = async () => {
    await axios
      .post("http://localhost:8081/add-creditor", newCreditorDetails)
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
    form.reset();
  };

  const deleteCreditor = async () => {
    console.log('trying deletion')
    try {
      await axios
        .delete(`http://localhost:8081/delete-creditor/${creditorToDelete}`)
        .then((res) => {
          window.location.reload(false);
        });
    } catch (err) {
      console.log("While deleting creditor", err);
    }
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
            <input
              name="creditorName"
              placeholder="enter new creditor name here..."
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
                    value={names.creditors_name}
                    className="options-drop"
                    key={names.creditors_name}
                  >
                    {names.creditors_name}
                  </option>
                );
              })}
            </select>
          }
          <div className="alert-buttons">
            <button onClick={toggleShowDeleteCreditorForm}>Cancel</button>
            <button onClick={deleteCreditor}>Delete Finance</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDeleteCreditor;
