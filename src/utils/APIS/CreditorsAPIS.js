import axios from "axios";

// const today = new Date();

//Expenses related URL & API
const recordCreditorURL = "http://localhost:8080/record-creditor";
const updateCreditorURL = "http://localhost:8080/update-creditor/";
const deleteCreditorURL = "http://localhost:8080/delete-creditor/";
const fetchCreditorByIDURL = "http://localhost:8080/fetch-creditor-by-ID/";
const fetchCreditorByNameURL = "http://localhost:8080/fetch-creditor-by-name/";
const fetchAllCreditorsURL = "http://localhost:8080/fetch-all-creditors";

//working fine
export async function fetchAllCreditors() {
  return await axios.get(fetchAllCreditorsURL);
}

//working fine not in use anywhere
export async function fetchCreditorByID() {
  return await axios.get(fetchCreditorByIDURL);
}

export async function fetchCreditorByName(creditorName) {
  return await axios.get(fetchCreditorByNameURL + creditorName);
}

//working fine
export async function deleteCreditor(creditorsID) {
  return await axios.delete(deleteCreditorURL + creditorsID);
}

//working fine
export async function recordCreditor(newCreditorDetails) {
  return await axios.post(recordCreditorURL, newCreditorDetails);
}

//working fine not in use anywhere
export async function updateCreditor(updateData, creditorsID) {
  return await axios.patch(updateCreditorURL + creditorsID, updateData);
}
