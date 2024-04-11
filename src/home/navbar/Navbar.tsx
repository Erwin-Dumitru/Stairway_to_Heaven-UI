import { Link } from "react-router-dom";
import logo from "@/assets/xStairs-Logo.svg";
import "./Navbar.scss";

function Navbar() {
    return (
        <div className="NavbarDiv">
            <div className="Navbar">
                <Link to="/dashboard" id="logoNav">
                    <img src={logo} alt="Bloc Logo" />
                </Link>
                
                <Link to="/">Despre</Link>
                <Link to="/signup">Pachete</Link>
                <Link to="/signup">Contact</Link>
                <Link to="/login" id="loginNav">Login</Link>
            </div>
        </div>
    );
}

export default Navbar;
