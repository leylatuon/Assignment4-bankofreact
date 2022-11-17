/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

// Import other components
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import LogIn from "./components/Login";
import Credits from "./components/Credits";
import Debits from "./components/Debits";

class App extends Component {
  constructor() {
    // Create and initialize state
    super();
    this.state = {
      accountBalance: 0,
      creditAmount: 0,
      creditList: [],
      debitAmount: 0,
      debitList: [],
      currentUser: {
        userName: "Joe Smith",
        memberSince: "11/22/99",
      },
    };
  }

  async componentDidMount() {
    const creditAPI = "https://moj-api.herokuapp.com/credits";
    const debitAPI = "https://moj-api.herokuapp.com/debits";
    try {
      let response = await axios.get(creditAPI);
      for(let i = 0; i < response.data.length; i++){
        this.setState({ creditList: response.data, accountBalance: this.state.accountBalance + response.data[i].amount, creditAmount: this.state.creditAmount + response.data[i].amount });
      }
      response = await axios.get(debitAPI);
      for(let i = 0; i < response.data.length; i++){
        this.setState({ debitList: response.data, accountBalance: this.state.accountBalance - response.data[i].amount, debitAmount: this.state.debitAmount - response.data[i].amount });
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      }
    }
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  // Create Routes and React elements to be rendered using React components
  render() {
    // Create React elements and pass input props to components
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    );
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );
    const LogInComponent = () => (
      <LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />
    );
    const DebitsComponent = () => <Debits debitAmount={this.state.debitAmount} debitInfo={this.state.debitList} />;
    const CreditsComponent = () => <Credits creditAmount={this.state.creditAmount} creditInfo={this.state.creditList} />;

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/Assignment4-bankofreact">
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
