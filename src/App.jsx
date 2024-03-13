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
import InstructorManage from "./admin/pages/InstructorManage";
import Programs from "./admin/pages/Programs";
import Courses from "./admin/pages/Courses";
import CourseDetails from "./admin/pages/CourseDetails";
import Payments from "./admin/pages/Payments";
import BlogTags from "./admin/pages/BlogTags";
import { BlogPost } from "./admin/pages/BlogPost";
import CreateBlog from "./admin/pages/CreateBlog";
import EditBlogPost from "./admin/pages/EditBlogPost";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Dashboard/>}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admins" element={<AdminManage/>}/>
          <Route path="/instructors" element={<InstructorManage/>}/>
          <Route path="/adduser" element={<Usercreate/>}/>
          <Route path="/students" element={<Student/>}  />
          <Route path="/studentdetails/:id" element={<Studentdetails/>}/>
          <Route path="/programs" element={<Programs/>}/>
          <Route path="/courses" element={<Courses/>}/>
          <Route path="/courses/:id" element={<CourseDetails/>}/>
          <Route path="/notify" element={<Notify/>}/>
          <Route path="/support" element={<Support/>}/>
          <Route path="/payments" element={<Payments/>}/>
          <Route path="/blog" element={<BlogPost/>}/>
          <Route path="/blog/add" element={<CreateBlog/>}/>
          <Route path="/blog-tags" element={<BlogTags/>}/>
          <Route path="/blog/edit/:id" element={<EditBlogPost/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
