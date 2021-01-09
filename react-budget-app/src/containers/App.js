import React, { Component } from 'react';
import uniqid from 'uniqid';

// MODELS
import Expense from '../models/Expense';
import Income from '../models/Income';

// CSS
import './App.css';

// COMPONENTS
import Auxiliary from '../hoc/Auxiliary';
import DeleteItemContext from '../context/deleteItemContext';

import DateComponent from '../components/DateComponent';
import AvailableBudget from '../components/AvailableBudgetComponent';
import TotalIncome from '../components/TotalIncome';
import TotalExpense from '../components/TotalExpense';

import Incomes from '../components/incomes/Incomes';
import Expenses from '../components/expenses/Expenses';
import Add from '../components/Add';

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
  }

  calcBudget = () => {
    let percentage;
    const expenses = [...this.state.expenses];
    const totalIncome = this.state.incomes.reduce((accumulator, cur) => accumulator + cur.value, 0);
    const totalExpense = this.state.expenses.reduce((accumulator, cur) => accumulator + cur.value, 0);

    if (totalIncome > 0) {
      percentage = Math.round(totalExpense / totalIncome * 100);
      expenses.forEach(expense => {
        expense.percentage = Math.round(expense.value / totalIncome * 100);
      });
    } else {
      percentage = -1;
      expenses.forEach(expense => {
        expense.percentage = -1;
      });
    }

    this.setState({
      totalIncome: totalIncome,
      totalExpense: totalExpense,
      percentage: percentage,
      expenses: expenses
    });
  }

  state = {
    totalIncome: 0,
    totalExpense: 0,
    percentage: -1,
    incomes: [],
    expenses: [],
    deleteExpenseId: null
  }

  addItem = (type, description, value) => {
    let items;
    if (type === 'inc') {
      items = [...this.state.incomes];
      items.push(new Income(uniqid('inc-'), description, parseFloat(value)));
      this.setState({
        incomes: items
      }, () => {
        this.calcBudget();
      });
    } else {
      items = [...this.state.expenses];
      items.push(new Expense(uniqid('exp-'), description, parseFloat(value)));
      this.setState({
        expenses: items
      }, () => {
        this.calcBudget();
      });
    }
  }

  deleteItem = (id, type) => {
    if (type === 'inc') {
      const items = [...this.state.incomes];
      const index = items.findIndex(item => item.id === id);
      items.splice(index, 1);
      this.setState({
        incomes: items
      }, () => {
        this.calcBudget();
      });
    } else {
      const items = [...this.state.expenses];
      const index = items.findIndex(item => item.id === id);
      items.splice(index, 1);
      this.setState({
        expenses: items
      }, () => {
        this.calcBudget();
      });
    }
  }

  render() {
    return (
      <Auxiliary>
        <DeleteItemContext.Provider
          value={
            {
              deleteItem: this.deleteItem
            }
          }>
          <div className="top">
            <div className="budget">
              <DateComponent></DateComponent>
              <AvailableBudget budget={this.state.totalIncome - this.state.totalExpense}></AvailableBudget>
              <TotalIncome value={this.state.totalIncome}></TotalIncome>
              <TotalExpense value={this.state.totalExpense} percentage={this.state.percentage}></TotalExpense>
            </div>
          </div>

          <div className="bottom">
            <Add add={this.addItem}></Add>

            <div className="container clearfix">
              <Incomes items={this.state.incomes}></Incomes>
              <Expenses items={this.state.expenses}></Expenses>
            </div>
          </div>
        </DeleteItemContext.Provider>
      </Auxiliary>
    );
  }
}

export default App;
