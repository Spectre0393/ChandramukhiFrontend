import React from 'react'
import './dailyexpenses.css'
import '../../utils/css/daily.css'
import DailyExpensesRecorder from './DailyExpensesRecorder'
import ExpensesTable from './ExpensesTable'

const DailyExpenses = () => {
  return (
    <div className="wrapper-second row-flex">
      <div className="content-padding-ten">
        <h2 className="bottom-margin-adjuster">Record New Expense</h2>
        <div>
          <DailyExpensesRecorder />
        </div>
        <div className="top-margin-adjuster">
          <ExpensesTable />
        </div>
      </div>
    </div>
  );
}

export default DailyExpenses