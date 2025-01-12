import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
    return (
        <header>
            <div className="content">
                <h1>Toc, toc!</h1>

                <h3>
                    Te-ai săturat să îți bată administratorul la ușă?
                    <br />
                    Vrei să plătești facturile online și să ai acces facturi?
                    <br />
                    <span>Noi îți oferă soluția!</span>
                </h3>

                <Link to="/dashboard" className="btn">Demo</Link>

                <Link to="/login" className="btn empty">Login</Link>
            </div>
        </header>
    );
};

export default Header;
