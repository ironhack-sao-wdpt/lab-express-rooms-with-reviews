import { createContext, useState, useEffect } from "react";

type userInterface = {
  user: { name: string; email: string; id: string | number };
  token: string;
};

const AuthContext = createContext<any>({
  token: "",
  user: { name: "", email: "", id: "" },
});

function AuthContextComponent(props: any) {
  const [state, setState] = useState<userInterface>({
    token: "",
    user: { name: "", email: "", id: "" },
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const stored: string = window.localStorage.getItem("loggedInUser") || '""';

    // Interpreta a string JSON de volta para javascript

    const storedUser: userInterface = JSON.parse(stored);

    // Caso exista um usuário logado, atualize o state global do context
    if (storedUser.user) {
      setState({ ...storedUser });
    }
  }, []);

  useEffect(() => setLoading(false), [state.user]);

  return (
    // Ver Login.js linhas 18 e 34

    <AuthContext.Provider value={[state, setState, loading]}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextComponent };
