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
            reject(err);
          } else {
            resolve(session);
          }
        });
      } else {
        const noUser = new Error("There is no active account");
        reject(noUser);
      }
    });
  };

  const confirmPassword = (Username, Password, NewPassword) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });
      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (error) => {
          reject(error);
        },
        newPasswordRequired: (_, req) => {
          user.completeNewPasswordChallenge(NewPassword, req, {
            onSuccess: (data) => {
              resolve(data);
            },
            onFailure: (error) => {
              reject(error);
            },
          });
        },
      });
    });
  };

  const authenticate = async (Username, Password) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });

      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: () => {
          resolve("newPasswordRequired");
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
      confirmPassword,
    };
  }, []);

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}
export { Account, AccountContext };
