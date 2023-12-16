import axios from "axios";
import { formatDate } from "../DateFormatter";

const today = new Date();

//Expenses related URL & API
const recordFinanceTransactionsURL =
  "http://localhost:8080/record-finance-transaction";
const updateFinanceTransactionsURL =
  "http://localhost:8080/update-finance-transaction/";
const deleteFinanceTransactionsURL =
  "http://localhost:8080/delete-finance-transaction/";
const fetchFinanceTransactionsURL =
  "http://localhost:8080/fetch-finance-transaction/";
const fetchAllFinancesTransactionsURL =
  "http://localhost:8080/fetch-all-finance-transactions";
const fetchFinanceTransactionsByNameURL =
  "http://localhost:8080/fetch-named-finance-transactions/";
const fetchAllTodayFinancesTransactionsURL =
  "http://localhost:8080/fetch-today-finance-transactions/";

//working fine
export async function fetchAllFinancesTransactions() {
  return await axios.get(fetchAllFinancesTransactionsURL);
}

export async function fetchFinanceTransactionsByName() {
  return await axios.get(fetchFinanceTransactionsByNameURL);
}

export async function fetchAllTodayFinancesTransactions() {
  return await axios.get(fetchAllTodayFinancesTransactionsURL+ formatDate(today));
}

//working fine not in use anywhere
export async function fetchFinanceTransactions(financesID) {
  return await axios.get(fetchFinanceTransactionsURL + financesID);
}

//working fine
export async function deleteFinanceTransactions(financesID) {
  return await axios.delete(deleteFinanceTransactionsURL + financesID);
}

//working fine
export async function recordFinanceTransactions(newFinanceTransaction) {
  return await axios.post(recordFinanceTransactionsURL, newFinanceTransaction);
}

//working fine not in use anywhere
export async function updateFinanceTransactions(financesID, updateData) {
  return await axios.patch(
    updateFinanceTransactionsURL + financesID,
    updateData
  );
}
