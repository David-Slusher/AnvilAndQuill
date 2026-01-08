import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [monsterTypes, setMonsterTypes] = useState([]);
    const [monsters, setMonsters] = useState([]);
    const [selectedTypeId, setSelectedTypeId] = useState('');
    const [loadingTypes, setLoadingTypes] = useState(true);
    const [loadingMonsters, setLoadingMonsters] = useState(false);
    const [error, setError] = useState(null);

    const apiBaseUrl = 'http://localhost:5018/api';

    // Fetch monster types when component mounts
    useEffect(() => {
        fetchMonsterTypes();
    }, []);

    const fetchMonsterTypes = async () => {
        try {
            setLoadingTypes(true);
            setError(null);

            const response = await fetch(`${apiBaseUrl}/MonsterTypes`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setMonsterTypes(data);
        } catch (err) {
            setError(`Failed to load monster types: ${err.message}`);
            console.error('Error fetching monster types:', err);
        } finally {
            setLoadingTypes(false);
        }
    };

    const fetchMonstersByType = async (typeId) => {
        if (!typeId) {
            setMonsters([]);
            return;
        }

        try {
            setLoadingMonsters(true);
            setError(null);

            const response = await fetch(`${apiBaseUrl}/Monsters/ByType/${typeId}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setMonsters(data);
        } catch (err) {
            setError(`Failed to load monsters: ${err.message}`);
            console.error('Error fetching monsters:', err);
            setMonsters([]);
        } finally {
            setLoadingMonsters(false);
        }
    };

    const handleTypeChange = (e) => {
        const typeId = e.target.value;
        setSelectedTypeId(typeId);
        fetchMonstersByType(typeId);
    };

    return (
        <div className="app">
            <div className="container">
                <h1 className="title">Monster Compendium</h1>

                {/* Error Message */}
                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                {/* Monster Type Dropdown */}
                <div className="filter-section">
                    <label htmlFor="monsterType" className="label">
                        Select Monster Type:
                    </label>
                    <select
                        id="monsterType"
                        value={selectedTypeId}
                        onChange={handleTypeChange}
                        disabled={loadingTypes}
                        className="select"
                    >
                        <option value="">-- Choose a Monster Type --</option>
                        {monsterTypes.map(type => (
                            //TODO why are key and value same?
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Loading State */}
                {loadingMonsters && (
                    <div className="loading">
                        Loading monsters...
                    </div>
                )}

                {/* Monsters Display */}
                {!loadingMonsters && selectedTypeId && monsters.length > 0 && (
                    <div className="monsters-section">
                        <h2 className="subtitle">
                            Monsters{' '}
                            <span className="count-badge">{monsters.length}</span>
                        </h2>
                        <div className="monsters-grid">
                            {monsters.map(monster => (
                                <div key={monster.id} className="monster-card">
                                    <div className="monster-name">{monster.name}</div>
                                    <div className="monster-id">ID: {monster.id}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* No Monsters Message */}
                {!loadingMonsters && selectedTypeId && monsters.length === 0 && (
                    <div className="no-monsters">
                        No monsters found for this type.
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;