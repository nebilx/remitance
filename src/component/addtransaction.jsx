import React from "react";
import { TransactionContext } from "../App";
import { AuthContext } from "../App";
import URL from "../url";
function AddTransaction(props) {
  const { state, dispatch } = React.useContext(TransactionContext);
  const { state: authState } = React.useContext(AuthContext);

  const [b_name, setB_name] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [b_account, setB_Account] = React.useState("");
  const [b_bank, setB_Bank] = React.useState("");

  const onClose = (e) => {
    props.onClose && props.onClose(e);
  };

  const isButtonDisabled =
    b_name === "" ||
    amount === "" ||
    b_account === "" ||
    b_bank === "" ||
    state.isTransactionSubmitting;

  const onSubmit = () => {
    dispatch({
      type: "ADD_TRANSACTION_REQUEST",
    });
    const transaction = {
      userId: authState.user.userId,
      beneficiary_name: b_name,
      amount: amount,
      beneficiary_account: b_account,
      beneficiary_bank: b_bank,
    };
    fetch(URL + "/transactions", {
      method: "POST",
      headers: {
        Authorization: authState.token,
        "Content-Type": `application/json`,
      },
      withCredentials: true,
      body: JSON.stringify(transaction),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((data) => {
        console.log(data);
        setB_name("");
        setAmount("");
        setB_Account("");
        setB_Bank("");
        dispatch({
          type: "ADD_TRANSACTION_SUCCESS",
          payload: data,
        });
        onClose();
      })
      .catch((error) => {
        dispatch({
          type: "ADD_TRANSACTION_FAILURE",
        });
      });
  };
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal" id="modal">
      <div className="modal-table-container">
        <div className="modal-table-cell">
          <div className="modal-overlay small">
            <div className="modal-header">
              <h1 className="modal-title">Transfer</h1>
            </div>
            <form className="modal-form">
              <div className="modal-form-inputs">
                <label htmlFor="b_name">Beneficiary Name</label>
                <input
                  id="b_name"
                  name="b_name"
                  type="text"
                  value={b_name}
                  onChange={(e) => setB_name(e.target.value)}
                  className="text-input"
                />

                <label htmlFor="amount">Amount</label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-input"
                />

                <label htmlFor="b_account">Beneficiary Account </label>
                <input
                  id="b_account"
                  name="b_account"
                  type="number"
                  value={b_account}
                  onChange={(e) => setB_Account(e.target.value)}
                  className="text-input"
                />
              </div>

              <label htmlFor="b_bank">Beneficiary Bank</label>
              <input
                id="b_bank"
                name="b_bank"
                type="text"
                value={b_bank}
                onChange={(e) => setB_Bank(e.target.value)}
                className="text-input"
              />

              <div className="form-error">
                <p>{state.transactionError && "Error Transaction Ocurred!"}</p>
              </div>
              <div className="form-action clearfix">
                <button
                  type="button"
                  id="overlay-confirm-button"
                  className="button button-primary"
                  onClick={onSubmit}
                  disabled={isButtonDisabled}
                >
                  {state.isTransactionSubmitting
                    ? "Transferring..."
                    : "Transfer"}
                </button>
                <button
                  type="button"
                  id="overlay-cancel-button"
                  className="button button-default small close-overlay pull-right"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;
