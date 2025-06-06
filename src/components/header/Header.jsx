import { VscThreeBars } from "react-icons/vsc";
import img from "./../../assets/logo.png";
import "./style.header.css";
const Header = ({open, setOpen}) => {
  return (
    <header className="header">
      <div>
      <VscThreeBars className="dotes" onClick={()=>setOpen(!open)}/>
      <img src={img}/>
      </div>
    </header>
  )
}

export default Header
