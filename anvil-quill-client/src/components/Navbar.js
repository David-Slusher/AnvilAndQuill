import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    Anvil & Quill
                </Link>

                <button
                    className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li className="navbar-item">
                        <Link to="/heroic" className="navbar-link" onClick={closeMenu}>
                            Heroic Compendium
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/monster" className="navbar-link" onClick={closeMenu}>
                            Monster Compendium
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/director" className="navbar-link" onClick={closeMenu}>
                            Director Compendium
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;