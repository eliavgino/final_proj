import logo from "./logo.svg";
import "./App.css";
import SignUp from "./components/signUp";
import Login from "./components/logIn";
import Barbers from "./components/barbers";

import "./App.css";
import BarberApp from "./components/barberApp";

function App() {
  return (
    <div className="App">
      {/* <SignUp />
      <Login />
      <Barbers /> */}
      <BarberApp />
    </div>
  );
}

export default App;
