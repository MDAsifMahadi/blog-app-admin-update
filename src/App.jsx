import { useEffect, useState } from "react";
import Dashboard from './pages/dashboard/Dashboard';
import LoginForm from "./pages/Login/LoginForm";
const App = () => {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(()=> {
    if(localStorage.getItem("token")){
      setIsLogin(true)
    }
  },[])
  
  return (
  <>{
    !isLogin ? <LoginForm /> : 
    <Dashboard />
  }</>
   
  )
}

export default App;
