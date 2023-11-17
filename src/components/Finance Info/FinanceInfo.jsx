import React, { useEffect, useState } from "react";
import "../../utils/css/daily.css";
import "../../utils/css/table.css";
import "../../utils/css/carousel.css";

import FinanceCardCarousel from "./CarouselAndCard/FinanceCardCarousel";
import DailyFinanceRecorder from "./DailyFinanceRecorder";
import UpdateDeleteFinanceTransaction from "../../utils/UpdateDeleteButton/UpdateDeleteFinanceTransaction";
import AddDeleteFinance from "./NewFinance/AddDeleteFinance";
import formattedStringDate from "../../utils/DateFormatter";

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

import axios from "axios";

let totalDepositMade;
let totalLoanPaid;
let todayFinanceCount;

const FinancialInfo = () => {
  const today = new Date();

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

  // fetch all finance transactions start
  useEffect(() => {
    const allFinanceTransaction = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/all-finance-transactions"
        );
        setFinanceTransactionsRows(response?.data.data);
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };

    allFinanceTransaction();
  }, []);
  // fetch all finance transactions end

  //filter today's finance transaction rows start
  const todayTotalTransaction = financeTransacionsRows?.filter((row) => {
    if (formattedStringDate(row.transaction_date) === today.toDateString()) {
      return row;
    } else return null;
  });
  //filter today's finance transaction rows end

  //filter all transaction for today's deposit start
  const todayTotalDepositsRows = todayTotalTransaction?.filter((row) => {
    if (row.transaction_type === "Deposit") {
      return row;
    } else return null;
  });
  //filter all transaction for today's deposit end

  //filter all transaction for today's loan start
  const todayTotalLoansRows = todayTotalTransaction?.filter((row) => {
    if (row.transaction_type === "Loan") {
      return row;
    } else return null;
  });
  //filter all transaction for today's deposit end

  // daily total counter start
  totalDepositMade = 0;
  todayTotalDepositsRows?.map((row) => {
    totalDepositMade = totalDepositMade + row.amount;
    return totalDepositMade;
  });

  totalLoanPaid = 0;
  todayTotalLoansRows?.map((row) => {
    totalLoanPaid = totalLoanPaid + row.amount;
    return totalLoanPaid;
  });

  todayFinanceCount = 0;
  todayTotalTransaction?.map((row) => {
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
                  Transaction Type
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
                todayTotalTransaction
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow className="pointer" key={row.transaction_id}>
                        <TableCell className="data-row-cell-formatter checkbox-row">
                          <Checkbox
                            onChange={(event) =>
                              handleSingleRowSelection(
                                event,
                                row.transaction_id,
                                row.finance_name,
                                row.amount
                              )
                            }
                          />
                        </TableCell>
                        <TableCell className="data-row-cell-formatter data-row-cell-long-wid">
                          {row.finance_name}
                        </TableCell>
                        <TableCell className="data-row-cell-formatter data-row-cell-short-wid">
                          {row.amount}
                        </TableCell>
                        <TableCell className="data-row-cell-formatter data-row-cell-short-wid">
                          {row.transaction_type}
                        </TableCell>
                        <TableCell className="data-row-cell-formatter data-row-cell-short-wid">
                          {row.deposited_by}
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
                <TableCell className="daily-summary-table-cell">
                  <p>Total Loan Payment: Rs. {totalLoanPaid}</p>
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
