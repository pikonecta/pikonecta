import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "@/config/UserPool";
import { useAccountState, useAccountDispatch } from "@/contexts/Account";

const useAccount = () => {
  const accountState = useAccountState();
  const accountDispatch = useAccountDispatch();

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
          accountDispatch({
            type: "setUser",
            payload: {
              user: {
                groups: data.idToken.payload["cognito:groups"],
                username: data.idToken.payload.username,
                original: { ...data },
              },
            },
          });
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

  const hasGroup = (group) => {
    return accountState.user && accountState.user.groups.includes(group);
  };

  const hasTenant = (tenantId) => {
    return accountState.user && accountState.user.tenant.id === tenantId;
  };

  return {
    user: accountState.user,
    hasTenant,
    hasGroup,
    authenticate,
    logout,
    confirmPassword,
  };
};

export default useAccount;
