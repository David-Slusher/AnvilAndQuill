import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home">
            <div className="home-container">
                <h1 className="home-title">Welcome to Anvil & Quill</h1>
                <p className="home-subtitle">
                    Another tool for MCDM's Draw Steel!
                </p>

                <div className="compendium-grid">
                    <Link to="/heroic" className="compendium-card">
                        <div className="card-icon">⚔️</div>
                        <h2>Heroic Compendium</h2>
                        <p>Manage heroes, abilities, and character progression</p>
                    </Link>

                    <Link to="/monster" className="compendium-card">
                        <div className="card-icon">🐉</div>
                        <h2>Monster Compendium</h2>
                        <p>Browse and organize monsters by type and challenge</p>
                    </Link>

                    <Link to="/director" className="compendium-card">
                        <div className="card-icon">📜</div>
                        <h2>Director Compendium</h2>
                        <p>Campaign management and game master tools</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;