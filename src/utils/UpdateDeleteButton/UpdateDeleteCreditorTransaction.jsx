import React, { useState } from "react";
import "./updatedelete.css";
import UpdateForm from "../../components/Creditors Info/UpdateForm";
import { deleteCreditorTransactions } from "../APIS/CreditorTransactionsAPIS";


const UpdateDeleteCreditorTransaction = ({ rowToModify }) => {
  const receivedRowId = rowToModify.fetchedId;

  //state and toggle function to delete and update alert start
  const [selectValueAlert, setSelectValueAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [initiateUpdate, setInitiateUpdate] = useState(false);
  const [toUpdateRow, setToUpdateRow] = useState();

  const toggleSelectValueAlert = () => {
    const toggler = !selectValueAlert;
    setSelectValueAlert(toggler);
  };

  const toggleDeleteAlert = () => {
    const toggler = !deleteAlert;
    setDeleteAlert(toggler);
  };

  const toggleUpdateAlert = () => {
    const toggler = !updateAlert;
    setUpdateAlert(toggler);
  };

  const toggleInitiateUpdate = () => {
    const toggler = !initiateUpdate;
    setInitiateUpdate(toggler);
  };

  const handleUpdateAlert = (event) => {
    if (receivedRowId === undefined) {
      toggleSelectValueAlert();
      return;
    } else {
      toggleUpdateAlert();
      return;
    }
  };

  const handleDeleteAlert = () => {
    if (receivedRowId === undefined) {
      toggleSelectValueAlert();
      return;
    } else {
      toggleDeleteAlert();
      return;
    }
  };

  const launchUpdate = () => {
    setToUpdateRow(receivedRowId);
    toggleInitiateUpdate();
  };

  const deleteRow = async () => {
    deleteCreditorTransactions(rowToModify.fetchedId)
      ?.then((response) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="updateDelete-buttonGroup-content">
      <div className="two-btn-group">
        <button
          className="general-alert-button update-button"
          onClick={handleUpdateAlert}
        >
          Update
        </button>
        <button
          className="general-alert-button delete-button"
          onClick={handleDeleteAlert}
        >
          Delete
        </button>
      </div>

      {/* all alerts */}

      {selectValueAlert && (
        <div className="notification-alert">
          <p>No row selected. Please select a row first.</p>
          <button
            className="general-alert-button ok-button"
            onClick={toggleSelectValueAlert}
          >
            OK
          </button>
        </div>
      )}

      {initiateUpdate && (
        <div className="update-form">
          <p>Initiating Update</p>
          <UpdateForm rowToUpdate={{ fetchedRow: toUpdateRow }} />
        </div>
      )}

      {updateAlert && (
        <div className="notification-alert">
          <p>Continue updating selected row?</p>
          <div className="two-btn-group">
            <button
              className="general-alert-button cancel-button"
              onClick={toggleUpdateAlert}
            >
              Cancel
            </button>
            <button
              className="general-alert-button continue-button"
              onClick={launchUpdate}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {deleteAlert && (
        <div className="notification-alert">
          <p>Continue deleting selected row?</p>
          <div className="two-btn-group">
            <button
              className="general-alert-button cancel-button"
              onClick={toggleDeleteAlert}
            >
              Cancel
            </button>
            <button
              className="general-alert-button continue-button"
              onClick={deleteRow}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default UpdateDeleteCreditorTransaction;
