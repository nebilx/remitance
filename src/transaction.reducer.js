const transaction_InitialState = {
  data: [],
  isFetching: false,
  hasError: false,
  isTransactionSubmitted: false,
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
        songs: action.payload,
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
        isSongSubmitting: true,
        songHasError: false,
      };
    case "ADD_TRANSACTION_SUCCESS":
      return {
        ...state,
        isSongSubmitting: false,
        songs: [...state.songs, action.payload],
      };
    case "ADD_TRANSACTION_FAILURE":
      return {
        ...state,
        isSongSubmitting: false,
        songHasError: true,
      };
    default:
      return state;
  }
};

export { transaction_InitialState, transaction_Reducer };
