import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../utils/css/table.css";
import "../../utils/css/daily.css";

import UpdateDeleteSales from "../../utils/UpdateDeleteButton/UpdateDeleteSales";
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

// needed extra variables start
const today = new Date();
let totalSales;
let totalQuantity;
// needed extra variables end

//component start
const SalesTable = () => {
  //states definations for data fetching start
  const [salesRows, setSalesRows] = useState([]);
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
    const allSales = async () => {
      try {
        const response = await axios.get("http://localhost:8081/all-sales");
        setSalesRows(response?.data.data);
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };
    allSales();
  }, []);
  //api call to fetch all sales data end

  //filter all sales for today's total sales start
  const todayTotalSalesRows = salesRows?.filter((row) => {
    if (formattedStringDate(row.sales_date) === today.toDateString()) {
      return row;
    } else return null;
  });
  //filter all sales for today's total sales end

  // daily total counter start
  totalSales = 0;
  todayTotalSalesRows?.map((row) => {
    totalSales = totalSales + row.total;
    return totalSales;
  });

  totalQuantity = 0;
  todayTotalSalesRows?.map((row) => {
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
    <div className="wrapper-second col-flex">
      <div className="table-content-header row-flex-spaced-center top-margin-adjuster-sales-expenses">
        <h2>Daily Sales Table</h2>
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
                Product's Description
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
                Sold By
              </TableCell>
              <TableCell className="header-cell-formatter medium-header-wid-bg">
                Modify Entry
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading &&
              todayTotalSalesRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow className="pointer" key={row.id}>
                      <TableCell className="data-row-cell-formatter checkbox-row">
                        <Checkbox
                          onChange={(event) =>
                            handleSingleRowSelection(event, row.id)
                          }
                        />
                      </TableCell>
                      <TableCell className="data-row-cell-formatter data-row-cell-long-wid">
                        {row.product_name}
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
                        {row.seller}
                      </TableCell>
                      <TableCell className="data-row-cell-formatter data-row-cell-medium-wid">
                        <UpdateDeleteSales
                          rowToModify={{ fetchedRow: rowIdToSend }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            <TableRow className="daily-summary-full-table-absolute-row">
              <TableCell className="daily-summary-table-cell">
                Total Items Sold: {totalQuantity} Pcs.
              </TableCell>
              <TableCell className="daily-summary-table-cell">
                Total Sales: Rs. {totalSales}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <TablePagination
          className="full-table-pagination"
          component="div"
          rowsPerPageOptions={[13]}
          count={todayTotalSalesRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default SalesTable;
