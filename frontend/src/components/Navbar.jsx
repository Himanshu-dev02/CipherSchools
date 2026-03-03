import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__inner container">
                <Link to="/" className="navbar__brand">
                    <span className="navbar__logo">⟨/⟩</span>
                    <span className="navbar__title">CipherSQLStudio</span>
                </Link>
                <div className="navbar__tagline">Interactive SQL Learning</div>
            </div>
        </nav>
    );
};

export default Navbar;
