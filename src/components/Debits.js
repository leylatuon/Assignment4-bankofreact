/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from "react-router-dom";

const Debits = (props) => {
  // Create the list of Debit items
  let debitsView = () => {
    const { debitInfo } = props;
    return debitInfo.map((debit) => {
      // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0, 10);
      return (
        <li key={debit.id}>
          {debit.amount} {debit.description} {date}
        </li>
      );
    });
  };
  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits: {(Math.round(props.debitAmount*100)/100).toFixed(2)}</h1>
      <h2>Balance: {(Math.round(props.accountBalance*100)/100).toFixed(2)}</h2>

      {debitsView()}

      <form onSubmit={props.addDebit}>
        Description: <input type="text" name="description" />
        Amount: <input type="number" step="0.01" name="amount" />
        <button type="submit">Add Debit</button>
      </form>
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Debits;
