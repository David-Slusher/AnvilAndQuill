import React from 'react';
import './DirectorCompendium.css';

function DirectorCompendium() {
    return (
        <div className="compendium-page">
            <div className="compendium-container">
                <div className="compendium-icon">📜</div>
                <h1 className="compendium-title">Director Compendium</h1>
                <p className="compendium-description">
                    This section is under construction. Here you'll be able to:
                </p>
                <ul className="compendium-features">
                    <li>Manage campaigns and story arcs</li>
                    <li>Create and organize encounters</li>
                    <li>Track game sessions and notes</li>
                    <li>Generate random events and NPCs</li>
                </ul>
            </div>
        </div>
    );
}

export default DirectorCompendium;