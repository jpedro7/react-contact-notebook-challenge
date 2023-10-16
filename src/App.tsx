import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Link to="/contacts">
        <button>Contatos</button>
      </Link>
    </div>
  );
}

export default App;
