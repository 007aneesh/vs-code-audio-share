import { useState } from "react";
import Dashboard from "./pages/dashboard";
import LoginForm from "./components/login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false); 

  const handleLogin = () => {
    setLoggedIn(true); 
  };

  return (
    <>
      {loggedIn ? (
        <Dashboard />
      ) : (
        <LoginForm onLogin={handleLogin} /> 
      )}
    </>
  );
}

export default App;
