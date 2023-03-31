const transaction_InitialState = {
  data: [],
  isFetching: false,
  hasError: false,
  isTransactionSubmitting: false,
  transactionError: false,
};
const transaction_Reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_TRANSACTION_REQUEST":
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case "FETCH_TRANSACTION_SUCCESS":
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };
    case "FETCH_TRANSACTION_FAILURE":
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    case "ADD_TRANSACTION_REQUEST":
      return {
        ...state,
        isTransactionSubmitting: true,
        transactionError: false,
      };
    case "ADD_TRANSACTION_SUCCESS":
      return {
        ...state,
        isTransactionSubmitting: false,
        data: [...state.data, action.payload],
      };
    case "ADD_TRANSACTION_FAILURE":
      return {
        ...state,
        isTransactionSubmitting: false,
        transactionError: true,
      };
    default:
      return state;
  }
};

export { transaction_InitialState, transaction_Reducer };
