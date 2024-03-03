// import React from "react";
// import { AiOutlinePieChart } from "react-icons/ri";
// import Link from "@/components/Link";
import "./Nav.scss";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

interface CustomLinkProps {
    to: string;
    children: any;
    className?: string;
    id?: string; // Add this line
}

function CustomLink({ to, children, ...props }: CustomLinkProps) {
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
            {/* <a href="../" className="imgNav" id="logoNav">
                <img src="../assets/xStairs-Logo.svg" alt="Bloc Logo" />
            </a> */}

            <Link to="/" className="imgNav">
                <img src="/src/assets/xStairs-Logo.svg" alt="Bloc Logo" />
            </Link>

            <div className="navLinks">
                <CustomLink to="/dashboard"><i className="ri-home-4-line" /></CustomLink>
                <CustomLink to="/dashboard/history"><i className="ri-history-line" /></CustomLink>
                <CustomLink to="/dashboard/news"><i className="ri-message-3-line" /></CustomLink>
                <CustomLink to="/dashboard/admin"><i className="ri-home-4-line" /></CustomLink>
                <CustomLink to="/dashboard/history-admin"><i className="ri-history-line" /></CustomLink>
                <CustomLink to="/dashboard/news-admin"><i className="ri-message-3-line" /></CustomLink>
            </div>
            <div className="navLinks" id="settingsButton">
                <CustomLink to="/dashboard/settings"><i className="ri-settings-line" /></CustomLink>
            </div>
        </div>
    );
}

export default Nav;
