import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./style.dashboard.css"; // style 
// components
import { useState } from "react";
import Article from "../ article/ Article";
import Header from "../../components/header/Header";
import Sidebar_Dashbord from "../../components/sidebar/Sidebar_Dashbord";
import NotFound from "../404/NotFound";
import Category from "../category/Category";
import CreatePost from "../create/CreatePost";
import Edit from "../edit/Edit";
import EditPost from "../editPost/EditePost";
import Setting from "../setting/Setting";
import Dashboard_Home from "./../home/Dashboard_Home";
const Dashboard = () => {

  const [open, setOpen] = useState(false);

  return (
    <div className="dashbord" >
     <BrowserRouter>
      <Sidebar_Dashbord open={open} setOpen={setOpen} />
      <Header open={open} setOpen={setOpen} />
      <Routes >
        <Route path="/" element={<Dashboard_Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/category" element={<Category />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/edit/post/:id" element={<EditPost />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default Dashboard;
