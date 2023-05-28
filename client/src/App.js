import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import AddData from "./components/add/AddData";
import Update from "./components/add/Update";
import Signup from "./components/Signup";
import Home from "./components/Home";
import store from "./store";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const { token } = store.getState();
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute component={Home} isAuthenticated={!!token} />
            }
          />
          <Route
            path="/adddata"
            element={
              <ProtectedRoute component={AddData} isAuthenticated={!!token} />
            }
          />
          <Route
            path="/update/:id"
            element={
              <ProtectedRoute component={Update} isAuthenticated={!!token} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
