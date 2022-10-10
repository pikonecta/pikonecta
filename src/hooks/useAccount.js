import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "@/config/UserPool";
import { useAccountState, useAccountDispatch } from "@/contexts/Account";
import { getTenantByEmail } from "@/utils/apiManager";
import { useEffect } from "react";

const useAccount = () => {
  const accountState = useAccountState();
  const user = accountState?.user?.user;
  const accountDispatch = useAccountDispatch();

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem("loggedInKonecta");
  //   if (loggedUserJSON) {
  //     JSON.parse(res);
  //   }
  // });

  const confirmPassword = (Username, Password, NewPassword) => {
    return new Promise((resolve, reject) => {
      const currentUser = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });
      currentUser.authenticateUser(authDetails, {
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (error) => {
          reject(error);
        },
        newPasswordRequired: (_, req) => {
          currentUser.completeNewPasswordChallenge(NewPassword, req, {
            onSuccess: (data) => {
              getTenantByEmail(data.idToken.payload.email).then(
                (dataTenant) => {
                  accountDispatch({
                    type: "setUser",
                    payload: {
                      user: {
                        groups: data.idToken.payload["cognito:groups"],
                        original: { ...data },
                        tenant: dataTenant.Items[0],
                      },
                    },
                  });
                }
              );
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
      const currentUser = new CognitoUser({ Username, Pool });

      const authDetails = new AuthenticationDetails({ Username, Password });

      currentUser.authenticateUser(authDetails, {
        onSuccess: (data) => {
          accountDispatch({
            type: "setUser",
            payload: {
              user: {
                groups: data.idToken.payload["cognito:groups"],
                email: data.idToken.payload.email,
                original: { ...data },
              },
            },
          });
          if (data.idToken.payload["cognito:groups"].includes("admin")) {
            accountDispatch({
              type: "setUser",
              payload: {
                user: {
                  groups: data.idToken.payload["cognito:groups"],
                  email: data.idToken.payload.email,
                  original: { ...data },
                },
              },
            });
          } else {
            getTenantByEmail(data.idToken.payload.email).then((dataTenant) => {
              accountDispatch({
                type: "setUser",
                payload: {
                  user: {
                    groups: data.idToken.payload["cognito:groups"],
                    original: { ...data },
                    tenant: dataTenant.Items[0],
                  },
                },
              });
            });
          }
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
    const currentUser = Pool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
      accountDispatch({
        type: "resetUser",
      });
    }
  };

  const hasGroup = (group) => {
    return accountState.user && accountState.user.groups.includes(group);
  };

  const hasTenant = (tenantId) => {
    return user && user.tenant.id === tenantId;
  };

  return {
    user,
    hasTenant,
    hasGroup,
    authenticate,
    logout,
    confirmPassword,
  };
};

export default useAccount;
