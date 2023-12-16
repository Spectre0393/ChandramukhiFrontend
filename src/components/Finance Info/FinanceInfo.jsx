import React, { useEffect, useState } from "react";
import "../../utils/css/daily.css";
import "../../utils/css/table.css";
import "../../utils/css/carousel.css";

import { fetchAllTodayFinancesTransactions } from "../../utils/APIS/FinanceTransactionsAPIS";
import FinanceCardCarousel from "./CarouselAndCard/FinanceCardCarousel";
import DailyFinanceRecorder from "./DailyFinanceRecorder";
import UpdateDeleteFinanceTransaction from "../../utils/UpdateDeleteButton/UpdateDeleteFinanceTransaction";
import AddDeleteFinance from "./NewFinance/AddDeleteFinance";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@mui/material/TablePagination";
import Checkbox from "@mui/material/Checkbox";

let totalDepositMade;
let todayFinanceCount;

const FinancialInfo = () => {
  const today = new Date();

  // holding only values to today transactions
  const [financeTransacionsRows, setFinanceTransactionsRows] = useState([]);
  const [loading, setLoading] = useState(false);

  //states defination and functions for table pagination start
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //states defination and functions for table pagination end

  // states defination and functions for row selection in table start
  const [rowIdToSend, setRowIdToSend] = useState();
  const [rowFinanceToSend, setRowFinanceToSend] = useState();
  const [rowAmountToSend, setRowAmountToSend] = useState();

  const handleSingleRowSelection = (
    event,
    id,
    rollBackName,
    rollBackAmount
  ) => {
    if (event.target.checked) {
      setRowIdToSend();
      setRowFinanceToSend();
      setRowAmountToSend();

      setRowIdToSend(id);
      setRowFinanceToSend(rollBackName);
      setRowAmountToSend(rollBackAmount);
      
    } else {
      setRowIdToSend();
      setRowFinanceToSend();
      setRowAmountToSend();
    }
  };
  // states defination and functions for row selection in table end

  // fetch today finance transactions start
  useEffect(() => {
    const allTodayFinanceTransaction = () => {
      fetchAllTodayFinancesTransactions()
        .then((response) => {
          setFinanceTransactionsRows(response?.data);
          setLoading(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    allTodayFinanceTransaction();
  }, []);
  // fetch all finance transactions end

  // daily total counter start
  totalDepositMade = 0;
  financeTransacionsRows?.map((row) => {
    totalDepositMade = totalDepositMade + row.depositedAmount;
    return totalDepositMade;
  });

  todayFinanceCount = 0;
  financeTransacionsRows?.map((row) => {
    todayFinanceCount = todayFinanceCount + 1;
    return todayFinanceCount;
  });
  // daily total counter end

  return (
    <div className="wrapper-second row-flex">
      <div className="content-padding-ten">
        <h2 className="bottom-margin-adjuster">
          Record New Finance Transaction
        </h2>
        <DailyFinanceRecorder />
        <div className="table-content-header row-flex-spaced-center top-margin-adjuster-finance-creditors">
          <h2>Daily Finance Transaction Record Table</h2>
          <h2 className="not-selectable">{today.toDateString()}</h2>
          <div className="row-flex col-gap-ten">
            <FontAwesomeIcon className="arrow-head" icon={faChevronLeft} />
            <FontAwesomeIcon className="arrow-head" icon={faChevronRight} />
          </div>
        </div>
        <Paper className="table-paper-container-shortened-height">
          <Table>
            <TableHead className="alert-relative-table-head">
              <TableRow className="table-header-row">
                <TableCell className="header-cell-formatter checkbox-header-wid-bg">
                  <Checkbox disabled indeterminate={true} color="success" />
                </TableCell>
                <TableCell className="header-cell-formatter long-header-wid-bg">
                  Finance Name
                </TableCell>
                <TableCell className="header-cell-formatter short-header-wid-bg">
                  Amount
                </TableCell>
                <TableCell className="header-cell-formatter short-header-wid-bg">
                  Deposited By
                </TableCell>
                <TableCell className="header-cell-formatter medium-header-wid-bg">
                  Modify Entry
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading &&
                financeTransacionsRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        className="pointer"
                        key={row.financeTransactionsID}
                      >
                        <TableCell className="data-row-cell-formatter checkbox-row">
                          <Checkbox
                            onChange={(event) =>
                              handleSingleRowSelection(
                                event,
                                row.financeTransactionsID,
                                row.financeName,
                                row.depositedAmount
                              )
                            }
                          />
                        </TableCell>
                        <TableCell className="data-row-cell-formatter data-row-cell-long-wid">
                          {row.financeName}
                        </TableCell>
                        <TableCell className="data-row-cell-formatter data-row-cell-short-wid">
                          {row.depositedAmount}
                        </TableCell>
                        <TableCell className="data-row-cell-formatter data-row-cell-short-wid">
                          {row.depositorName}
                        </TableCell>
                        <TableCell className="data-row-cell-formatter data-row-cell-medium-wid">
                          <UpdateDeleteFinanceTransaction
                            rowToModify={{
                              fetchedId: rowIdToSend,
                              fetchedName: rowFinanceToSend,
                              fetchedAmount: rowAmountToSend,
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              <TableRow className="daily-summary-short-table-absolute-row">
                <TableCell className="daily-summary-table-cell">
                  <p>Finance Count: {todayFinanceCount}</p>
                </TableCell>
                <TableCell className="daily-summary-table-cell">
                  <p>Total Deposit: Rs. {totalDepositMade}</p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <TablePagination
            className="short-table-pagination"
            component="div"
            rowsPerPageOptions={[6]}
            count={financeTransacionsRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <div className="carousel-content col-flex">
          <div className="carousel-header row-flex-spaced-center">
            <h2 className="not-selectable">All Finances</h2>
            <div>
              <AddDeleteFinance />
            </div>
          </div>
          <div className="carousel-display">
            <FinanceCardCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialInfo;
