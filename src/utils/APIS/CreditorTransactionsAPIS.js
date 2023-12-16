import axios from "axios";
import { formatDate } from "../DateFormatter";

const today = new Date();

//Expenses related URL & API
const recordrCeditorTransactionsURL =
  "http://localhost:8080/record-creditor-transaction";
const updateCreditorTransactionsURL =
  "http://localhost:8080/update-creditor-transaction/";
const deleteCreditorTransactionsURL =
  "http://localhost:8080/delete-creditor-transaction/";
const fetchAllCreditorsTransactionsURL =
  "http://localhost:8080/fetch-all-creditor-transactions";
const fetchCreditorTransactionsByNameURL =
  "http://localhost:8080/fetch-named-creditor-transactions/";
const fetchAllTodayCreditorsTransactionsURL =
  "http://localhost:8080/fetch-today-creditor-transactions/";

//working fine
export async function fetchAllCreditorsTransactions() {
  return await axios.get(fetchAllCreditorsTransactionsURL);
}

export async function fetchCreditorTransactionsByName() {
  return await axios.get(fetchCreditorTransactionsByNameURL);
}

export async function fetchAllTodayCreditorsTransactions() {
  return await axios.get(
    fetchAllTodayCreditorsTransactionsURL + formatDate(today)
  );
}

//working fine not in use anywhere
export async function fetchCreditorTransactions(creditorsID) {
  return await axios.get(fetchAllCreditorsTransactionsURL + creditorsID);
}

//working fine
export async function deleteCreditorTransactions(creditorsID) {
  return await axios.delete(deleteCreditorTransactionsURL + creditorsID);
}

//working fine
export async function recordCreditorTransactions(newcreditorTransaction) {
  return await axios.post(
    recordrCeditorTransactionsURL,
    newcreditorTransaction
  );
}

//working fine not in use anywhere
export async function updatereditorTransactions(creditorsID, updateData) {
  return await axios.patch(
    updateCreditorTransactionsURL + creditorsID,
    updateData
  );
}
