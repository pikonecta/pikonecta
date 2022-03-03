import React, { createContext, useMemo } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "@/config/UserPool";

const AccountContext = createContext();

function Account({ children }) {
  const getSession = () => {
    return new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  const authenticate = async (Username, Password) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });

      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          // console.log("onSuccess: ", data); on success result object
          resolve(data);
        },
        onFailure: (err) => {
          // console.error("onFailure: ", err); on error response
          reject(err);
        },
        newPasswordRequired: (data) => {
          // console.log("newPasswordRequired: ", data); if you need to change the password, it returns your mail
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  const value = useMemo(() => {
    return {
      authenticate,
      getSession,
      logout,
    };
  }, []);

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}
export { Account, AccountContext };
