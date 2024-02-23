// import React from "react";
import "./styles/Navbar.css";
// import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="NavbarDiv">
        <div className="Navbar">
            <a href="./dashboard/" id="logoNav">
                <img src="./assets/xStairs-Logo.svg" alt="Bloc Logo" />
            </a>
            {/* <Link to="/dashboard/" id="homeNav">
                <img src="./assets/xStairs-Logo.svg" alt="Bloc Logo" />
            </Link> */}
            <a href="/">Despre</a>
            <a href="./login/">Pachete</a>
            <a href="./login/">Contact</a>
            <a href="./login/" id="loginNav">Login</a>
        </div>
        </div>
    );
}

export default Navbar;