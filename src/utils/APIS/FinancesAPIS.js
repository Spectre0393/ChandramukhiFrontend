import axios from "axios";

// const today = new Date();

//Expenses related URL & API
const recordFinanceURL = "http://localhost:8080/record-finance";
const updateFinanceURL = "http://localhost:8080/update-finance/";
const deleteFinanceURL = "http://localhost:8080/delete-finance/";
const fetchFinanceByIDURL = "http://localhost:8080/fetch-finance-by-ID/";
const fetchFinanceByNameURL = "http://localhost:8080/fetch-finance-by-name/";
const fetchAllFinancesURL = "http://localhost:8080/fetch-all-finances";

//working fine
export async function fetchAllFinances() {
  return await axios.get(fetchAllFinancesURL);
}

//working fine not in use anywhere
export async function fetchFinanceByID() {
  return await axios.get(fetchFinanceByIDURL);
}

export async function fetchFinanceByName(financeName) {
  return await axios.get(fetchFinanceByNameURL + financeName);
}

//working fine
export async function deleteFinance(financesID) {
  return await axios.delete(deleteFinanceURL + financesID);
}

//working fine
export async function recordFinance(newFinanceDetails) {
  return await axios.post(recordFinanceURL, newFinanceDetails);
}

//working fine not in use anywhere
export async function updateFinance(updateData, financesID) {
  return await axios.patch(updateFinanceURL + financesID, updateData);
}
