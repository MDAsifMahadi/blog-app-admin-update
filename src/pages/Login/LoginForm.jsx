import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import sound from "../../utilities/sound";
import API from "./../../lib/API";
import "./loginFrom.css";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {email, password : pass}
    API.post("/admin/login", data)
      .then(res => {
        localStorage.setItem("token", res.data.token)
        toast.success(res.data.message);
        sound.mess();
      })
      .catch(err => {
        toast.error(err.response.data.error);
        sound.err();
      })
  };

  return (
    <div className="body">
      <div className="form1">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" className="email1" name="email" value={email} onChange={e => setEmail(e.target.value)}/>

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" className="password1" name="password" value={pass} onChange={e => setPass(e.target.value)}/>

        <label> <input type="checkbox" className="checkbox" name="remember" /> Remember Me </label>

        <input type="submit" value="Submit" className="submit" />
      </form>
    </div>
    <ToastContainer />
  </div>
  );
};

export default LoginForm;
