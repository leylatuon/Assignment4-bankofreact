/*==================================================
src/components/AccountBalance.js

The AccountBalance component displays account balance. It is included in other page views.
==================================================*/
import React, {Component} from 'react';

class AccountBalance extends Component {
  // Display account balance
  render() {
    return (
      <div>
        Balance: {(Math.round(this.props.accountBalance*100)/100)}
      </div>
    );
  }
}

export default AccountBalance;