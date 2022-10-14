import { createContext, useReducer, useContext } from "react";

const INITIAL_STATE = {
  user: null,
};
const AccountStateContext = createContext(INITIAL_STATE);
const AccountDispatchContext = createContext(() => {});

function accountReducer(state, action) {
  switch (action.type) {
    case "setUser": {
      window.localStorage.setItem(
        "user",
        JSON.stringify({ ...state.user, ...action.payload })
      );
      return { ...state, user: { ...state.user, ...action.payload } };
    }
    case "resetUser": {
      window.localStorage.removeItem("user");
      return INITIAL_STATE;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AccountProvider({ children }) {
  const [state, dispatch] = useReducer(accountReducer, INITIAL_STATE);

  return (
    <AccountDispatchContext.Provider value={dispatch}>
      <AccountStateContext.Provider value={state}>
        {children}
      </AccountStateContext.Provider>
    </AccountDispatchContext.Provider>
  );
}

function useAccountDispatch() {
  const context = useContext(AccountDispatchContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within a AccountProvider");
  }
  return context;
}

function useAccountState() {
  const context = useContext(AccountStateContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within a AccountProvider");
  }
  return context;
}

export { AccountProvider, useAccountDispatch, useAccountState };
