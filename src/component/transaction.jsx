import React from "react";
import {
  transaction_InitialState,
  transaction_Reducer,
} from "../reducer/transaction.reducer";
import { AuthContext } from "../App";
import Card from "./card";
import { TransactionContext } from "../App";
import AddTransaction from "./add_transaction";
function Transaction() {
  const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(
    transaction_Reducer,
    transaction_InitialState
  );

  const [isAddSongModalVisible, setAddSongModalVisibility] =
    React.useState(false);

  const toggleAddSong = () => {
    setAddSongModalVisibility(!isAddSongModalVisible);
  };

  React.useEffect(() => {
    dispatch({
      type: "FETCH_TRANSACTION_REQUEST",
    });
    fetch("/transactions", {
      method: "GET",
      headers: {
        Authorization: authState.accessToken,
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((resJson) => {
        dispatch({
          type: "FETCH_TRANSACTION_SUCCESS",
          payload: resJson.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "FETCH_TRANSACTION_FAILURE",
        });
      });
  }, [authState.accessToken]);

  return (
    <React.Fragment>
      <TransactionContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <button className="toggle-button" onClick={toggleAddSong}>
          Transaction
        </button>
        <AddTransaction onClose={toggleAddSong} show={isAddSongModalVisible} />
      </TransactionContext.Provider>
      <div className="home">
        {state.isFetching ? (
          <span className="loader">LOADING...</span>
        ) : state.hasError ? (
          <span className="error">AN ERROR HAS OCCURRED</span>
        ) : (
          <>
            {state.data.length > 0 &&
              state.data.map((data, i) => <Card key={i} data={data} />)}
          </>
        )}
      </div>
    </React.Fragment>
  );
}

export default Transaction;
