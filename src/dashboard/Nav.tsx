// import React from "react";
// import { AiOutlinePieChart } from "react-icons/ri";
import "./styles/Nav.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function CustomLink({ to, children, ...props }: {to: string, children: any}) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}

function Nav() {
    return (
        <div className="nav">
            <a href="../" className="imgNav" id="logoNav">
                <img src="../assets/xStairs-Logo.svg" alt="Bloc Logo" />
            </a>
            <div className="navLinks">
                <CustomLink to="/dashboard/"><i className="ri-home-4-line"></i></CustomLink>
                <CustomLink to="/dashboard/history"><i className="ri-history-line"></i></CustomLink>
                <CustomLink to="/dashboard/news"><i className="ri-message-3-line"></i></CustomLink>
                <CustomLink to="/dashboard/admin"><i className="ri-home-4-line"></i></CustomLink>
                <CustomLink to="/dashboard/history-admin"><i className="ri-history-line"></i></CustomLink>
                <CustomLink to="/dashboard/news-admin"><i className="ri-message-3-line"></i></CustomLink>
            </div>
            <div className="navLinks" id="settingsButton">
                <CustomLink to="/dashboard/settings"><i className="ri-settings-line"></i></CustomLink>
            </div>
        </div>
    );
}

export default Nav;
