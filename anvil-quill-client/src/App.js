import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    //state management: const [value, setValue] = useState(initialValue)
    //value = current state
    //setValue = function to update state
    //initialValue = starting value of the state
    const [monsterTypes, setMonsterTypes] = useState([]);
    const [monsters, setMonsters] = useState([]);
    const [selectedTypeId, setSelectedTypeId] = useState('');
    const [loadingTypes, setLoadingTypes] = useState(true);
    const [loadingMonsters, setLoadingMonsters] = useState(false);
    const [error, setError] = useState(null);
    const [selectedMonster, setSelectedMonster] = useState(null);

    const apiBaseUrl = 'http://localhost:5018/api';

    //When component first loads, immediatelty fetch monster types
    useEffect(() => {
        fetchMonsterTypes();
    }, []);

    //get monster types for dropdown
    const fetchMonsterTypes = async () => {
        try {
            setLoadingTypes(true);
            setError(null);

            const response = await fetch(`${apiBaseUrl}/MonsterTypes`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const monsterTypeData = await response.json();
            //trigger re-render with new data
            setMonsterTypes(monsterTypeData);
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

            const monsterData = await response.json();
            setMonsters(monsterData);
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

    const handleMonsterClick = (monster) => {
        setSelectedMonster(monster);
    };

    return (
        <div className="app">
            <div className="container">
                <h1 className="title">Monster Compendium</h1>

                {/* Display error message if truthy*/}
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
                {/* Not loading, user selected a type, and there are monsters of that type */}
                {!loadingMonsters && selectedTypeId && monsters.length > 0 && (
                    <div className="monsters-section">
                        <h2 className="subtitle">
                            Monsters{' '}
                            <span className="count-badge">{monsters.length}</span>
                        </h2>
                        <div className="monsters-layout">
                            <div className="monsters-list">
                                {monsters.map(monster => (
                                    <div
                                        key={monster.id}
                                        className={`monster-list-item ${selectedMonster?.id === monster.id ? 'selected' : ''}`}
                                        onClick={() => handleMonsterClick(monster)}
                                    >
                                        <div className="monster-name">{monster.name}</div>
                                        <div className="monster-id">ID: {monster.id}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="monster-details">
                                {selectedMonster ? (
                                    <>
                                        {/*TODO: make a helper function to go through selectedMonster and get name & other props*/}
                                        <h3 className="detail-title">{selectedMonster.name}</h3>
                                        <div className="detail-section">
                                            <div className="detail-label">Monster ID:</div>
                                            <div className="detail-value">{selectedMonster.id}</div>
                                        </div>
                                        <div className="detail-section">
                                            <div className="detail-label">Type ID:</div>
                                            <div className="detail-value">{selectedMonster.monsterTypeId}</div>
                                        </div>
                                        <div className="detail-section">
                                            <div className="detail-label">Type:</div>
                                            <div className="detail-value">
                                                {monsterTypes.find(t => t.id === selectedMonster.monsterTypeId)?.name || 'Unknown'}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="no-selection">
                                        <p>Select a monster to view details</p>
                                    </div>
                                )}
                            </div>

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