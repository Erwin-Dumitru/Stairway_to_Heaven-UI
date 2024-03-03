import { Link } from "react-router-dom";
import "./Navbar.scss";

// interface LinkProps {
//     to: string;
//     children: any;
//     id?: string; // Add this line
// }

// function Link({ to, children, id, ...props }: LinkProps) {
//     const resolvedPath = useResolvedPath(to);
//     const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    
//     return (
//         <Link to={to} id={id} {...props}>
//             {children}
//         </Link>
//     );
// }

function Navbar() {
    return (
        // <div className="NavbarDiv">
        //     <div className="Navbar">
        //         <a href="./dashboard/" id="logoNav">
        //             <img src="./assets/xStairs-Logo.svg" alt="Bloc Logo" />
        //         </a>
        //         {/* <Link to="/dashboard/" id="homeNav">
        //             <img src="./assets/xStairs-Logo.svg" alt="Bloc Logo" />
        //         </Link> */}
        //         <a href="/">Despre</a>
        //         <a href="./login/">Pachete</a>
        //         <a href="./login/">Contact</a>
        //         <a href="./login/" id="loginNav">Login</a>
        //     </div>
        // </div>

        <div className="NavbarDiv">
            <div className="Navbar">
                <Link to="/dashboard" id="logoNav">
                    <img src="/src/assets/xStairs-Logo.svg" alt="Bloc Logo" />
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