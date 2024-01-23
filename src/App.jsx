import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Admin from "./admin/pages/Admin"
import "./App.css";
import Login from "./pages/Login"
import Home from "./admin/pages/Home";
import Profile from "./admin/pages/Profile";
import Dashboard from "./admin/pages/Admin";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Dashboard/>}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
