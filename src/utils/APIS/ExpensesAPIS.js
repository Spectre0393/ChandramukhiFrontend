import axios from "axios";
import { formatDate } from "../DateFormatter";

const today = new Date();

//Expenses related URL & API
const recordExpenseURL = "http://localhost:8080/record-expense";
const updateExpenseURL = "http://localhost:8080/update-expense/";
const deleteExpenseURL = "http://localhost:8080/delete-expense/";
// const fetchExpenseURL = "http://localhost:8080/fetch-expense/"; is of no use for now
const fetchTodayExpensesURL = "http://localhost:8080/fetch-today-expenses/";
const fetchAllExpensesURL = "http://localhost:8080/fetch-all-expenses";

//working fine
export async function fetchAllExpenses() {
  return await axios.get(fetchAllExpensesURL);
}

//working fine
export async function fetchTodayExpenses() {
  return await axios.get(fetchTodayExpensesURL + formatDate(today));
}

//working fine
export async function deleteExpense(expensesID) {
  return await axios.delete(deleteExpenseURL + expensesID);
}

//working fine
export async function recordExpense(expensesData) {
  return await axios.post(recordExpenseURL, expensesData);
}

//working fine
export async function updateExpense(expensesID, updateData) {
  return await axios.patch(updateExpenseURL + expensesID, updateData);
}
