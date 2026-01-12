import React from 'react';
import './HeroicCompendium.css';

function HeroicCompendium() {
    return (
        <div className="compendium-page">
            <div className="compendium-container">
                <div className="compendium-icon">⚔️</div>
                <h1 className="compendium-title">Heroic Compendium</h1>
                <p className="compendium-description">
                    This section is under construction. Here you'll be able to:
                </p>
                <ul className="compendium-features">
                    <li>Manage hero characters and their abilities</li>
                    <li>Track character progression and experience</li>
                    <li>Create and customize hero classes</li>
                    <li>Organize equipment and inventory</li>
                </ul>
            </div>
        </div>
    );
}

export default HeroicCompendium;