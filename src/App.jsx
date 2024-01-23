import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Admin from "./admin/pages/Admin"
import "./App.css";
import Login from "./pages/Login"

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
