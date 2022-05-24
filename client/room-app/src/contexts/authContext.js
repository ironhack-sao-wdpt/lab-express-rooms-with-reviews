import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({ token: "", user: {} });

function AuthContextComponent(props) {
  const [state, setState] = useState({ token: "", user: {} });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem("loggedInUser") || '""';

    const storedUser = JSON.parse(stored);

    if (storedUser.user) {
      setState({ ...storedUser });
    }
  }, []);

  useEffect(() => setLoading(false), [state.user]);

  return (
    <AuthContext.Provider value={[state, setState, loading]}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextComponent };
