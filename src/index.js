import React from "react";  // Importa a biblioteca React
import ReactDOM from "react-dom";  // Importa a biblioteca ReactDOM
import App from "./App";  // Importa o componente principal App 

ReactDOM.render(  // Chama o método render da biblioteca ReactDOM, que renderiza um elemento React no DOM.
  <React.StrictMode>  // Um wrapper que ativa verificações e avisos adicionais para os componentes
    <App />  // vai renderizar o componente App dentro do StrictMode.
  </React.StrictMode>,
  document.getElementById("root")  /componente App deve ser inserido no elemento com o ID "root".
);
