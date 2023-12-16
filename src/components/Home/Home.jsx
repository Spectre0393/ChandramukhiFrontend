import React, { useEffect, useState } from "react";
import "./home.css";
import "../../utils/css/table.css";
import { fetchTodayExpenses } from "../../utils/APIS/ExpensesAPIS";
import { fetchTodaySales } from "../../utils/APIS/SalesAPIS";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@material-ui/core/Paper";

let totalSales;
let totalExpenses;
let totalSalesQuantity;
let totalExpensesQuantity;

const Home = () => {

  //states definations for data fetching start
  const [salesRows, setSalesRows] = useState([]);
  const [expensesRows, setExpensesRows] = useState([]);
  const [loading, setLoading] = useState(false);
  //states definations for data fetching end

  //states defination and functions for table pagination start
  const [salesPage, setSalesPage] = React.useState(0);
  const [salesRowsPerPage, setSalesRowsPerPage] = React.useState(13);
  const handleSalesChangePage = (event, newSalesPage) => {
    setSalesPage(newSalesPage);
  };

  const handleSalesChangeRowsPerPage = (event) => {
    setSalesRowsPerPage(+event.target.value);
    setSalesPage(0);
  };
  //states defination and functions for table pagination end

  //states defination and functions for table pagination start
  const [expensespage, setExpensesPage] = React.useState(0);
  const [expensesRowsPerPage, setExpensesRowsPerPage] = React.useState(13);
  const handleExpensesChangePage = (event, newExpensesPage) => {
    setExpensesPage(newExpensesPage);
  };

  const handleExpensesChangeRowsPerPage = (event) => {
    setExpensesRowsPerPage(+event.target.value);
    setExpensesPage(0);
  };
  //states defination and functions for table pagination end

  useEffect(() => {
    const allSales = async () => {
    fetchTodaySales()?.then((response) => {
      setSalesRows(response?.data);
      setLoading(true);
    });
    };
    const allExpenses = async () => {
    fetchTodayExpenses()?.then((response) => {
      setExpensesRows(response?.data);
      setLoading(true);
    });
    };
    allSales();
    allExpenses();
  }, []);
  //api call to fetch all sales data end


  // daily total counter start
  totalSales = 0;
  salesRows?.map((row) => {
    totalSales = totalSales + row.price * row.quantity;
    return totalSales;
  });

  totalSalesQuantity = 0;
  salesRows?.map((row) => {
    totalSalesQuantity = totalSalesQuantity + row.quantity;
    return totalSalesQuantity;
  });

  totalExpenses = 0;
  expensesRows?.map((row) => {
    totalExpenses = totalExpenses + row.price * row.quantity;
    return totalExpenses;
  });

  totalExpensesQuantity = 0;
  expensesRows?.map((row) => {
    totalExpensesQuantity = totalExpensesQuantity + row.quantity;
    return totalExpensesQuantity;
  });
  // daily total counter end

  return (
    <div className="wrapper-second">
      <div className="home-content">
        <div className="home-content-headers">
          <h1>Chandra Mukhi Fancy Store</h1>
          <h1>Overview</h1>
        </div>
        <div className="row-flex col-gap-ten">
          <div className="home-sales-table">
            <Paper className="home-paper-container-extended-height">
              <Table>
                <TableHead>
                  <TableRow className="home-table-header-row">
                    <TableCell className="header-cell-formatter home-long-header-wid-bg">
                      Product's Description
                    </TableCell>
                    <TableCell className="header-cell-formatter home-short-header-wid-bg">
                      Price
                    </TableCell>
                    <TableCell className="header-cell-formatter home-short-header-wid-bg">
                      Quantity
                    </TableCell>
                    <TableCell className="header-cell-formatter home-short-header-wid-bg">
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading &&
                    salesRows
                      .slice(
                        salesPage * salesRowsPerPage,
                        salesPage * salesRowsPerPage + salesRowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow className="pointer" key={row.salesID}>
                            <TableCell className="data-row-cell-formatter home-data-row-cell-long-wid">
                              {row.productName}
                            </TableCell>
                            <TableCell className="data-row-cell-formatter home-data-row-cell-short-wid">
                              {row.price}
                            </TableCell>
                            <TableCell className="data-row-cell-formatter home-data-row-cell-short-wid">
                              {row.quantity}
                            </TableCell>
                            <TableCell className="data-row-cell-formatter home-data-row-cell-short-wid">
                              {row.price * row.quantity}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  <TableRow className="home-sales-daily-summary-absolute-row">
                    <TableCell className="daily-summary-table-cell">
                      Total Items Sold: {totalSalesQuantity} Pcs.
                    </TableCell>
                    <TableCell className="daily-summary-table-cell">
                      Total Sales: Rs. {totalSales}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <TablePagination
                className="home-sales-table-pagination"
                component="div"
                rowsPerPageOptions={[13]}
                count={salesRows.length}
                rowsPerPage={salesRowsPerPage}
                page={salesPage}
                onPageChange={handleSalesChangePage}
                onRowsPerPageChange={handleSalesChangeRowsPerPage}
              />
            </Paper>
          </div>
          <div className="home-expenses-table">
            <Paper className="home-paper-container-extended-height">
              <Table>
                <TableHead>
                  <TableRow className="home-table-header-row">
                    <TableCell className="header-cell-formatter home-long-header-wid-bg">
                      Expense Description
                    </TableCell>
                    <TableCell className="header-cell-formatter home-short-header-wid-bg">
                      Price
                    </TableCell>
                    <TableCell className="header-cell-formatter home-short-header-wid-bg">
                      Quantity
                    </TableCell>
                    <TableCell className="header-cell-formatter home-short-header-wid-bg">
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading &&
                    expensesRows
                      .slice(
                        expensespage * expensesRowsPerPage,
                        expensespage * expensesRowsPerPage + expensesRowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow className="pointer" key={row.expensesID}>
                            <TableCell className="data-row-cell-formatter home-data-row-cell-long-wid">
                              {row.expenseDetail}
                            </TableCell>
                            <TableCell className="data-row-cell-formatter home-data-row-cell-short-wid">
                              {row.price}
                            </TableCell>
                            <TableCell className="data-row-cell-formatter home-data-row-cell-short-wid">
                              {row.quantity}
                            </TableCell>
                            <TableCell className="data-row-cell-formatter home-data-row-cell-short-wid">
                              {row.price * row.quantity}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  <TableRow className="home-expenses-daily-summary-absolute-row">
                    <TableCell className="daily-summary-table-cell">
                      <p>Total Items Sold: {totalExpensesQuantity} Pcs.</p>
                    </TableCell>
                    <TableCell className="daily-summary-table-cell">
                      <p>Total Sales: Rs. {totalExpenses}</p>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <TablePagination
                className="home-expenses-table-pagination"
                component="div"
                rowsPerPageOptions={[13]}
                count={expensesRows.length}
                rowsPerPage={expensesRowsPerPage}
                page={expensespage}
                onPageChange={handleExpensesChangePage}
                onRowsPerPageChange={handleExpensesChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
