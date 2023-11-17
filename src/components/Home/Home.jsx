import React, { useEffect, useState } from "react";
import "./home.css";
import "../../utils/css/table.css";
import formattedStringDate from "../../utils/DateFormatter";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@material-ui/core/Paper";

import axios from "axios";

let totalSales;
let totalExpenses;
let totalSalesQuantity;
let totalExpensesQuantity;

const Home = () => {
  const today = new Date();

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
      try {
        const response = await axios.get("http://localhost:8081/all-sales");
        setSalesRows(response?.data.data);
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };
    const allExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:8081/all-expenses");
        setExpensesRows(response?.data.data);
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };
    allSales();
    allExpenses();
  }, []);
  //api call to fetch all sales data end

  //filter all sales for today's total sales start
  const todayTotalSalesRows = salesRows?.filter((row) => {
    if (formattedStringDate(row.sales_date) === today.toDateString()) {
      return row;
    } else return null;
  });
  //filter all sales for today's total sales end

  //filter all expenses for today's total expenses start
  const todayTotalExpensesRows = expensesRows?.filter((row) => {
    if (formattedStringDate(row.expenses_date) === today.toDateString()) {
      return row;
    } else return null;
  });
  //filter all expenses for today's total expenses end

  // daily total counter start
  totalSales = 0;
  todayTotalSalesRows?.map((row) => {
    totalSales = totalSales + row.total;
    return totalSales;
  });

  totalSalesQuantity = 0;
  todayTotalSalesRows?.map((row) => {
    totalSalesQuantity = totalSalesQuantity + row.quantity;
    return totalSalesQuantity;
  });

  totalExpenses = 0;
  todayTotalExpensesRows?.map((row) => {
    totalExpenses = totalExpenses + row.total;
    return totalExpenses;
  });

  totalExpensesQuantity = 0;
  todayTotalExpensesRows?.map((row) => {
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
                    todayTotalSalesRows
                      .slice(
                        salesPage * salesRowsPerPage,
                        salesPage * salesRowsPerPage + salesRowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow className="pointer" key={row.id}>
                            <TableCell className="data-row-cell-formatter home-data-row-cell-long-wid">
                              {row.product_name}
                            </TableCell>
                            <TableCell className="data-row-cell-formatter home-data-row-cell-short-wid">
                              {row.price}
                            </TableCell>
                            <TableCell className="data-row-cell-formatter home-data-row-cell-short-wid">
                              {row.quantity}
                            </TableCell>
                            <TableCell className="data-row-cell-formatter home-data-row-cell-short-wid">
                              {row.total}
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
                count={todayTotalSalesRows.length}
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
                    todayTotalExpensesRows
                      .slice(
                        expensespage * expensesRowsPerPage,
                        expensespage * expensesRowsPerPage + expensesRowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow className="pointer" key={row.expenses_id}>
                            <TableCell className="data-row-cell-formatter home-data-row-cell-long-wid">
                              {row.expense_name}
                            </TableCell>
                            <TableCell className="data-row-cell-formatter home-data-row-cell-short-wid">
                              {row.price}
                            </TableCell>
                            <TableCell className="data-row-cell-formatter home-data-row-cell-short-wid">
                              {row.quantity}
                            </TableCell>
                            <TableCell className="data-row-cell-formatter home-data-row-cell-short-wid">
                              {row.total}
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
                count={todayTotalExpensesRows.length}
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
