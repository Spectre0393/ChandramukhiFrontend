import React, { useEffect, useState } from "react";
import "../../utils/css/daily.css";
import "../../utils/css/table.css";
import "../../utils/css/carousel.css";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@mui/material/TablePagination";
import Checkbox from "@mui/material/Checkbox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import DailyCreditorRecorder from "./DailyCreditorRecorder";
import AddDeleteCreditor from "./New Creditor/AddDeleteCreditor";
import CreditorsCardCarousel from "./CarouselAndCard/CreditorsCardCarousel";
import UpdateDeleteCreditorTransaction from "../../utils/UpdateDeleteButton/UpdateDeleteCreditorTransaction";
import {fetchAllTodayCreditorsTransactions} from '../../utils/APIS/CreditorTransactionsAPIS'

let totalLoanPaid;
let todayCreditorsCount;

const CreditorsInfo = () => {
  const today = new Date();

  const [creditorTransacionsRows, setCreditorTransactionsRows] = useState([]);
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
  const [rowCreditorToSend, setRowCreditorToSend] = useState();
  const [rowAmountToSend, setRowAmountToSend] = useState();

  const handleSingleRowSelection = (
    event,
    id,
    rollBackName,
    rollBackAmount
  ) => {
    if (event.target.checked) {
      setRowIdToSend();
      setRowCreditorToSend();
      setRowAmountToSend();

      setRowIdToSend(id);
      setRowCreditorToSend(rollBackName);
      setRowAmountToSend(rollBackAmount);
    } else {
      setRowIdToSend();
      setRowCreditorToSend();
      setRowAmountToSend();
    }
  };
  // states defination and functions for row selection in table end

  // fetch all finance transactions start
  useEffect(() => {
    const allCreditorTransaction = async () => {
      fetchAllTodayCreditorsTransactions()
      ?.then((response)=>{
        setCreditorTransactionsRows(response?.data);
        setLoading(true);
      }).catch((error)=>{
        console.log(error);
      })
    };
    allCreditorTransaction();
  }, []);
  // fetch all finance transactions end

  // daily total counter start
  totalLoanPaid = 0;
  creditorTransacionsRows?.map((row) => {
    totalLoanPaid = totalLoanPaid + row.depositedAmount;
    return totalLoanPaid;
  });

  todayCreditorsCount = 0;
  creditorTransacionsRows?.map((row) => {
    todayCreditorsCount = todayCreditorsCount + 1;
    return todayCreditorsCount;
  });
  // daily total counter end

  return (
    <div className="wrapper-second row-flex">
      <div className="content-padding-ten">
        <h2 className="bottom-margin-adjuster">
          Record New Creditors Transaction
        </h2>
        <DailyCreditorRecorder />
        <div className="table-content-header row-flex-spaced-center top-margin-adjuster-finance-creditors">
          <h2>Daily Creditors Transaction Record Table</h2>
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
                  Creditor's Name
                </TableCell>
                <TableCell className="header-cell-formatter short-header-wid-bg">
                  Deposited Amount
                </TableCell>
                <TableCell className="header-cell-formatter short-header-wid-bg">
                  Paid By
                </TableCell>
                <TableCell className="header-cell-formatter medium-header-wid-bg">
                  Modify Entry
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading &&
                creditorTransacionsRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        className="pointer"
                        key={row.creditorTransactionsID}
                      >
                        <TableCell className="data-row-cell-formatter checkbox-row">
                          <Checkbox
                            onChange={(event) =>
                              handleSingleRowSelection(
                                event,
                                row.creditorTransactionsID,
                                row.creditorName,
                                row.depositedAmount
                              )
                            }
                          />
                        </TableCell>
                        <TableCell className="data-row-cell-formatter data-row-cell-long-wid">
                          {row.creditorName}
                        </TableCell>
                        <TableCell className="data-row-cell-formatter data-row-cell-short-wid">
                          {row.depositedAmount}
                        </TableCell>
                        <TableCell className="data-row-cell-formatter data-row-cell-short-wid">
                          {row.depositorName}
                        </TableCell>
                        <TableCell className="data-row-cell-formatter data-row-cell-medium-wid">
                          <UpdateDeleteCreditorTransaction
                            rowToModify={{
                              fetchedId: rowIdToSend,
                              fetchedName: rowCreditorToSend,
                              fetchedAmount: rowAmountToSend,
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              <TableRow className="daily-summary-short-table-absolute-row">
                <TableCell className="daily-summary-table-cell">
                  <p>Creditors Count: {todayCreditorsCount}</p>
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
            count={creditorTransacionsRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <div className="carousel-content col-flex">
          <div className="carousel-header row-flex-spaced-center">
            <h2 className="not-selectable">All Creditors</h2>
            <div>
              <AddDeleteCreditor />
            </div>
          </div>

          <div className="carousel-display">
            <CreditorsCardCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditorsInfo;
