import { NavLink } from "react-router-dom";
import logo from "./../../assets/logo.jpg";
import "./style.sidebar_dashbord.css";

// icons
import { FaEdit } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { MdOutlinePostAdd, MdOutlineSettings } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";


const Sidebar_Dashbord = () => {
  return (
    <aside className="admin__sidebar">
      <div className="admin__sidebar__header">
        <img src={logo} alt="logo" />
        <h3>Dashboard</h3>
      </div>
        <NavLink className="admin__links" to="/" title="Home">
            <FiHome className="admin_sidebar_icon"/><span className="opton__text"> Home</span>
        </NavLink>
        <NavLink className="admin__links" to="/category" title="Category"> 
            <TbCategoryPlus className="admin_sidebar_icon" /><span className="opton__text"> Category</span>
        </NavLink>
        <NavLink className="admin__links" to="/create" title="Create"> 
            <MdOutlinePostAdd className="admin_sidebar_icon" /><span className="opton__text"> Create</span>
        </NavLink>
        <NavLink className="admin__links" to="/edit"  title="Edit Posts">
            <FaEdit className="admin_sidebar_icon" /><span className="opton__text"> Edit Posts</span>
        </NavLink>
        <NavLink className="admin__links" to="/setting"  title="Settings"> 
            <MdOutlineSettings className="admin_sidebar_icon" /><span className="opton__text"> Administration</span>
        </NavLink>
     </aside>
  )
}

export default Sidebar_Dashbord
