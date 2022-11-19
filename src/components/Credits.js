/*==================================================
src/components/Credits.js
The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from "react-router-dom";

const Credits = (props) => {
  let creditsView = () => {
    const { creditInfo } = props;
    return creditInfo.map((credit) => {
      // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = credit.date.slice(0, 10);
      return (
        <li key={credit.id}>
          {credit.amount} {credit.description} {date}
        </li>
      );
    });
  };
  return (
    <div>
      <h1>Credits: {(Math.round(props.creditAmount*100)/100).toFixed(2)}</h1>
      <h2>Balance: {(Math.round(props.accountBalance*100)/100).toFixed(2)}</h2>

      {creditsView()}

      <form onSubmit={props.addCredit}>
        Description: <input type="text" name="description" />
        Amount: <input type="number" step="0.01" name="amount" />
        <button type="submit">Add Credit</button>
      </form>
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Credits;