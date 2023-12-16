import React, { useEffect, useState } from "react";
import "../../utils/css/table.css";
import "../../utils/css/daily.css";

import UpdateDeleteExpenses from "../../utils/UpdateDeleteButton/UpdateDeleteExpenses";
import { fetchTodayExpenses } from "../../utils/APIS/ExpensesAPIS";

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

  // this is not used, but if we ever need all sales data, this will do
  /*     useEffect(() => {
    fetchAllExpenses()?.then((response) => {
      setExpensesRows(response?.data);
      setLoading(true);
    });
  }, []); */

  //api call to fetch all today expenses data start
  useEffect(() => {
    fetchTodayExpenses()?.then((response) => {
      setExpensesRows(response?.data);
      setLoading(true);
    });
  }, []);
  //api call to fetch all today expenses data end

  // daily total counter start
  totalExpenses = 0;
  expensesRows?.map((row) => {
    totalExpenses = totalExpenses + row.price * row.quantity;
    return totalExpenses;
  });

  totalQuantity = 0;
  expensesRows?.map((row) => {
    totalQuantity = totalQuantity + row.quantity;
    return totalQuantity;
  });
  // daily total counter end

  const [rowIdToSend, setRowIdToSend] = useState();

  const handleSingleRowSelection = (event, id) => {
    if (event.target.checked) {
      setRowIdToSend();
      setRowIdToSend(id);
    } else {
      setRowIdToSend();
    }
  };

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
              expensesRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow className="pointer" key={row.expensesID}>
                      <TableCell className="data-row-cell-formatter checkbox-row">
                        <Checkbox
                          onChange={(event) =>
                            handleSingleRowSelection(event, row.expensesID)
                          }
                        />
                      </TableCell>
                      <TableCell className="data-row-cell-formatter data-row-cell-long-wid">
                        {row.expenseDetail}
                      </TableCell>
                      <TableCell className="data-row-cell-formatter data-row-cell-short-wid">
                        {row.price}
                      </TableCell>
                      <TableCell className="data-row-cell-formatter data-row-cell-short-wid">
                        {row.quantity}
                      </TableCell>
                      <TableCell className="data-row-cell-formatter data-row-cell-short-wid">
                        {row.price * row.quantity}
                      </TableCell>
                      <TableCell className="data-row-cell-formatter data-row-cell-short-wid">
                        {row.expenderName}
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
                <p>Total Expenses: Rs. {totalExpenses}</p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <TablePagination
          className="full-table-pagination"
          component="div"
          rowsPerPageOptions={[13]}
          count={expensesRows.length}
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
