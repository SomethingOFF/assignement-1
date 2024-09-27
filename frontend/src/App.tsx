import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import FilePage from "./pages/file-page";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import RegisterForm from "./pages/register-page";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { GetMyDetails } from "./features/auth/authSlice";
const App = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(GetMyDetails());
  }, [dispatch]);
  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <Router>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/register" Component={RegisterForm} />
          <Route
            path="/file-upload"
            element={
              <ProtectedRoute>
                <FilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" Component={LoginPage} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
