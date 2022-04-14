import Pool from "@/config/UserPool";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccountDispatch, useAccountState } from "@/contexts/Account";
import { getTenantByEmail } from "@/utils/apiManager";

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const accountState = useAccountState();
  const accountDispatch = useAccountDispatch();

  useEffect(() => {
    if (accountState.user) {
      setLoading(false);
    } else {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            setLoading(false);
            navigate("/login");
          } else {
            getTenantByEmail(session.idToken.payload.email).then((data) => {
              accountDispatch({
                type: "setUser",
                payload: {
                  user: {
                    groups: session.idToken.payload["cognito:groups"],
                    username: session.idToken.payload.username,
                    original: { ...session },
                    tenant: data.Items[0],
                  },
                },
              });

              setLoading(false);
            });
          }
        });
      } else {
        setLoading(false);
        navigate("/login");
      }
    }
  }, []);

  return { loading, user: accountState.user };
};

export default useAuth;
