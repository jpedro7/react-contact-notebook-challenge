import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Agenda</h1>
      <Link to="/contacts">
        <button>Contatos</button>
      </Link>
      <Link to="/notebook">
        <button>Bloco de notas</button>
      </Link>
    </div>
  );
}

export default App;
