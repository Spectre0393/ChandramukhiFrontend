import axios from "axios";
import { formatDate } from "../DateFormatter";

const today = new Date();

//sales related URL & API
const recordSaleURL = "http://localhost:8080/record-sale";
const updateSaleURL = "http://localhost:8080/update-sale/";
const deleteSaleURL = "http://localhost:8080/delete-sale/";
// const fetchSaleURL = "http://localhost:8080/fetch-sale/"; is of no use for now
const fetchTodaySalesURL = "http://localhost:8080/fetch-today-sales/";
const fetchAllSalesURL = "http://localhost:8080/fetch-all-sales";

//working fine
export async function fetchAllSales() {
  return await axios.get(fetchAllSalesURL);
}

//working fine
export async function fetchTodaySales() {
  return await axios.get(fetchTodaySalesURL + formatDate(today));
}

//working fine
export async function deleteSale(salesID) {
  return await axios.delete(deleteSaleURL + salesID);
}

//working fine
export async function recordSale(salesData) {
  return await axios.post(recordSaleURL, salesData);
}

//working fine
export async function updateSale(salesID, updateData) {
  return await axios.patch(updateSaleURL + salesID, updateData);
}
