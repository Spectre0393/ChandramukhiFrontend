import React from "react";
import "./mainlanding.css";

import { Routes, Route, Link } from "react-router-dom";
import {
  Home,
  DailySales,
  DailyExpenses,
  FinanceInfo,
  CreditorsInfo,
} from "../../components/index";

const MainLanding = () => {
  return (
    <div className="wrapper">
      <div className="mainlanding-content">
        <div className="mainlanding-sidebar">
          <div className="mainlanding-menus">
            <ul>
              <li>
                <Link to="/" className="menu-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/daily-sales" className="menu-link">
                  Daily Sales
                </Link>
              </li>
              <li>
                <Link to="/daily-expenses" className="menu-link">
                  Daily Expenses
                </Link>
              </li>
              <li>
                <Link to="/finances-info" className="menu-link">
                  Finances Info
                </Link>
              </li>
              <li>
                <Link to="/creditors-info" className="menu-link">
                  Creditors Info
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mainlanding-main-content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/creditors-info" element={<CreditorsInfo />} />
            <Route path="/finances-info" element={<FinanceInfo />} />
            <Route path="/daily-sales" element={<DailySales />} />
            <Route path="/daily-expenses" element={<DailyExpenses />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainLanding;
