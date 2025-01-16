import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import API from "./../../lib/API";
import sound from "./../../utilities/sound";
import "./style.setting.css";


const Setting = () => {

  const navigate = useNavigate();

  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const [email, setEmail] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("")
  const [conPass, setConPass] = useState("")

  const handleSubmit = () => {
      if (email === "") {
        toast.error("ইমেইল এড্রেস লিখুন!");
        sound.err()
        return;
      }
      if (oldPass === "") {
          toast.error("পুরাতন পাসওয়ার্ডটি লিখুন!");
          sound.err()
          return;
      }
      if (newPass === "") {
          toast.error("নতুন পাসওয়ার্ড লিখুন!");
          sound.err()
          return;
      }
      if (conPass === "") {
          toast.error("নিশ্চিত পাসওয়ার্ড লিখন!");
          sound.err()
          return;
      }
      if (newPass !== conPass) {
        toast.error("পাসওয়ার্ড নিশ্চিত করুন!");
        sound.err()
        return;
      }
      const data = {
        email,
        oldPass,
        password : newPass,
      }
      API.put("/admin/update", JSON.stringify(data), {
        headers : {
          'Content-Type': 'application/json',
        }
      })
        .then(res => {
          toast.success(res.data.message)
          sound.mess()
          localStorage.removeItem("token");
        })
        .catch(err => {
          toast.error(err.response.data.error);
          sound.err();
        }) 
  }

  const handleLogOut= e => {
    localStorage.removeItem("token");
    navigate("/");

  }
  return (
    <div className="setting">
      <div className="card form">
        <h3 className="h3">Change Admin Password</h3>
        <div className="form-card">
        <div className="form-group">
            <input 
            type="email" 
            className="input" 
            placeholder="Enter Your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input 
            type="password" 
            className="input" 
            placeholder="Enter Your Old Password"
            value={oldPass}
            onChange={e => setOldPass(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input 
            className="input" 
            type={showPass1 ? `input` : `password`} placeholder="Enter A New Password"
            value={newPass}
            onChange={e => setNewPass(e.target.value)}
            />
            {showPass1 ? <FiEye className="eye" onClick={() => setShowPass1(!showPass1)} /> : <FiEyeOff className="eye"  onClick={() => setShowPass1(!showPass1)} />}
          </div>
          <div className="form-group">
            <input 
            type={showPass2 ? `input` : `password`} className="input" 
            placeholder="Enter A Conform Password"
            value={conPass}
            onChange={e => setConPass(e.target.value)}
            />
            {showPass2 ? <FiEye className="eye" onClick={() => setShowPass2(!showPass2)} /> : <FiEyeOff className="eye"  onClick={() => setShowPass2(!showPass2)} />}
          </div>
          <button className="mini-btn submit" onClick={handleSubmit}>Submit</button>
          
        </div>
       
        <span className="mini-btn submit log" onClick={handleLogOut} id="logout">Log out</span>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Setting;