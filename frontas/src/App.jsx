import LoginPage from "./components/LoginPage";
import Header from "./components/Header";
import { useAuth } from "./context/AuthContext";

import { Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import { ToastContainer } from "react-toastify";
import Mechanic from "./components/Mechanic";

function App() {
  const { token, user } = useAuth();

  if (!token) {
    return (
      <>
        <LoginPage />
        <ToastContainer position="top-center" autoClose={3000} />
      </>
    );
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const isAdmin = user?.roles?.some((role) => role.name === "ROLE_ADMIN");

  return (
    <main>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/mechanics" element={<Mechanic />} />
          {isAdmin && <Route path="/admin" element={<Admin />} />}
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </main>
  );
}

export default App;
