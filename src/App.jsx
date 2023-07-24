import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages";
import AdminPage from "./pages/admin";
import PrivateRoute from "./components/private-route";
import "../src/assets/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
