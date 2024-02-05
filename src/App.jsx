import { Route, Routes } from "react-router-dom";
// import ScrollToTop from "./components/ScrollToTop";
import Admin from "./admin/pages/Admin"
import "./App.css";
import Login from "./pages/Login"
import Home from "./admin/pages/Home";
import Profile from "./admin/pages/Profile";
import Dashboard from "./admin/pages/Admin";
import AdminManage from "./admin/pages/AdminManage";
import Usercreate from "./admin/pages/Usercreate";
import Student from "./admin/pages/Student";
import Studentdetails from "./admin/pages/Studentdetails";
import Notify from "./admin/pages/Notify";
import Support from "./admin/pages/Support";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Dashboard/>}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admins" element={<AdminManage/>}/>
          <Route path="/adduser" element={<Usercreate/>}/>
          <Route path="/student" element={<Student/>}  />
          <Route path="/studentdetails" element={<Studentdetails/>}/>
          <Route path="/notify" element={<Notify/>}/>
          <Route path="/support" element={<Support/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
