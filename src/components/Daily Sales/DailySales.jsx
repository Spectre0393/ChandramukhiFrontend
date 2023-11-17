import React from "react";
import "./dailysales.css";
import "../../utils/css/daily.css";
import DailySalesRecorder from "./DailySalesRecorder";
import SalesTable from "./SalesTable";

const DailySales = () => {
  return (
    <div className="wrapper-second row-flex">
      <div className="content-padding-ten">
        <h2 className="bottom-margin-adjuster">Record New Sale</h2>
        <div>
          <DailySalesRecorder />
        </div>
        <div className="top-margin-adjuster">
          <SalesTable />
        </div>
      </div>
    </div>
  );
};

export default DailySales;