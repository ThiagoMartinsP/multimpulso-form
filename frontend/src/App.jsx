import Form from "./components/Form";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Multimpulso</h1>
        <p>Entre em contato conosco</p>
      </header>

      <main>
        <Form />
      </main>
    </div>
  );
}

export default App;
