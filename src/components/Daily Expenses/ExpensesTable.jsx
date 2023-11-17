import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../utils/css/table.css";
import "../../utils/css/daily.css";

import UpdateDeleteExpenses from "../../utils/UpdateDeleteButton/UpdateDeleteExpenses";
import formattedStringDate from "../../utils/DateFormatter";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import TablePagination from "@mui/material/TablePagination";
import Checkbox from "@mui/material/Checkbox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

//needed extra variables start
const today = new Date();
let totalExpenses;
let totalQuantity;
// needed extra variables end

//component start
const ExpensesTable = () => {
  //states definations for data fetching start
  const [expensesRows, setExpensesRows] = useState([]);
  const [loading, setLoading] = useState(false);
  //states definations for data fetching end

  //states defination and functions for table pagination start
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(13);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //states defination and functions for table pagination end

  //api call to fetch all sales data start
  useEffect(() => {
    const allExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:8081/all-expenses");
        setExpensesRows(response?.data.data);
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };
    allExpenses();
  }, []);
  //api call to fetch all sales data end

  //filter all expenses for today's total expenses start
  const todayTotalExpensesRows = expensesRows?.filter((row) => {
    if (formattedStringDate(row.expenses_date) === today.toDateString()) {
      return row;
    } else return null;
  });
  //filter all expenses for today's total expenses end

  // daily total counter start
  totalExpenses = 0;
  todayTotalExpensesRows?.map((row) => {
    totalExpenses = totalExpenses + row.total;
    return totalExpenses;
  });

  totalQuantity = 0;
  todayTotalExpensesRows?.map((row) => {
    totalQuantity = totalQuantity + row.quantity;
    return totalQuantity;
  });
  // daily total counter end

  // states defination and functions for row selection in table start
  const [rowIdToSend, setRowIdToSend] = useState();

  const handleSingleRowSelection = (event, id) => {
    if (event.target.checked) {
      setRowIdToSend();
      setRowIdToSend(id);
    } else {
      setRowIdToSend();
    }
  };

  /*   const handleSelectAllRows = (event) => {
    if (event.target.checked) {
      setRowIdToSend(todayTotalSalesRows?.map((row) => row.id));
      return;
    }
    setRowIdToSend([]);
  }; */
  // states defination and functions for row selection in table end

  return (
    <div className="table-wrapper wrapper-second col-flex">
      <div className="table-content-header row-flex-spaced-center top-margin-adjuster-sales-expenses">
        <h2>Daily Expenses Table</h2>
        <h2>{today.toDateString()}</h2>
        <div className="row-flex col-gap-ten">
          <FontAwesomeIcon className="arrow-head" icon={faChevronLeft} />
          <FontAwesomeIcon className="arrow-head" icon={faChevronRight} />
        </div>
      </div>
      <Paper className="table-paper-container-extended-height">
        <Table>
          <TableHead className="alert-relative-table-head">
            <TableRow className="table-header-row">
              <TableCell className="header-cell-formatter checkbox-header-wid-bg">
                <Checkbox disabled indeterminate={true} color="success" />
              </TableCell>
              <TableCell className="header-cell-formatter long-header-wid-bg">
                Expense Description
              </TableCell>
              <TableCell className="header-cell-formatter short-header-wid-bg">
                Price
              </TableCell>
              <TableCell className="header-cell-formatter short-header-wid-bg">
                Quantity
              </TableCell>
              <TableCell className="header-cell-formatter short-header-wid-bg">
                Total
              </TableCell>
              <TableCell className="header-cell-formatter short-header-wid-bg">
                Expended
                <br />
                By
              </TableCell>
              <TableCell className="header-cell-formatter medium-header-wid-bg">
                Modify Entry
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading &&
              todayTotalExpensesRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow className="pointer" key={row.expenses_id}>
                      <TableCell className="data-row-cell-formatter checkbox-row">
                        <Checkbox
                          onChange={(event) =>
                            handleSingleRowSelection(event, row.expenses_id)
                          }
                        />
                      </TableCell>
                      <TableCell className="data-row-cell-formatter data-row-cell-long-wid">
                        {row.expense_name}
                      </TableCell>
                      <TableCell className="data-row-cell-formatter data-row-cell-short-wid">
                        {row.price}
                      </TableCell>
                      <TableCell className="data-row-cell-formatter data-row-cell-short-wid">
                        {row.quantity}
                      </TableCell>
                      <TableCell className="data-row-cell-formatter data-row-cell-short-wid">
                        {row.total}
                      </TableCell>
                      <TableCell className="data-row-cell-formatter data-row-cell-short-wid">
                        {row.expender}
                      </TableCell>
                      <TableCell className="data-row-cell-formatter data-row-cell-medium-wid">
                        <UpdateDeleteExpenses
                          rowToModify={{ fetchedRow: rowIdToSend }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            <TableRow className="daily-summary-full-table-absolute-row">
              <TableCell className="daily-summary-table-cell">
                <p>Total Items Sold: {totalQuantity} Pcs.</p>
              </TableCell>
              <TableCell className="daily-summary-table-cell">
                <p>Total Sales: Rs. {totalExpenses}</p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <TablePagination
          className="full-table-pagination"
          component="div"
          rowsPerPageOptions={[13]}
          count={todayTotalExpensesRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default ExpensesTable;
