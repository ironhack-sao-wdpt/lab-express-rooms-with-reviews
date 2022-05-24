import axios from "axios";

// Configurando o domínio padrão da API para não precisarmos ficar repetindo em todas as rotas
const api = axios.create({ baseURL: "http://localhost:4000" });

// Definir o cabeçalho de autenticação padrão para todas as rotas
api.interceptors.request.use((config) => {
  // Checa se temos um usuário armazenado previamente no computador do usuário. Caso não tenha, criamos uma string JSON vazia
  const stored = window.localStorage.getItem("loggedInUser") || '""';

  // Interpreta a string JSON de volta para javascript
  const storedUser = JSON.parse(stored);

  if (storedUser.token) {
    config.headers = {
      // Caso exista um token, injete-o nos cabeçalhos de todas as requisições
      Authorization: `Bearer ${storedUser.token}`,
    };
  }

  return config;
});

export default api;
