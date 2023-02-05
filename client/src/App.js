import logo from "./logo.svg";
import "./App.css";
import SignUp from "./components/signUp";
import Login from "./components/logIn";
import Barbers from "./components/barbers";

function App() {
  return (
    <div className="App">
      <SignUp />
      <Login />
      <Barbers />
    </div>
  );
}

export default App;
