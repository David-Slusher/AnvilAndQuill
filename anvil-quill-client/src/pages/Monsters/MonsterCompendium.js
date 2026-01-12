import React, { useState, useEffect } from 'react';
import './MonsterCompendium.css';

function MonsterCompendium() {
    const [monsterBands, setmonsterBands] = useState([]);
    const [monsters, setMonsters] = useState([]);
    const [selectedTypeId, setSelectedTypeId] = useState('');
    const [loadingTypes, setLoadingTypes] = useState(true);
    const [loadingMonsters, setLoadingMonsters] = useState(false);
    const [error, setError] = useState(null);
    const [selectedMonster, setSelectedMonster] = useState(null);

    const apiBaseUrl = 'http://localhost:5018/api';
    useEffect(() => {
        fetchmonsterBands();
    }, []);

    const fetchmonsterBands = async () => {
        try {
            setLoadingTypes(true);
            setError(null);

            const response = await fetch(`${apiBaseUrl}/monsterBands`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const monsterBandData = await response.json();
            setmonsterBands(monsterBandData);
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
        setSelectedMonster(null);
        fetchMonstersByType(typeId);
    };

    const handleMonsterClick = (monster) => {
        setSelectedMonster(monster);
    };

    return (
        <div className="monster-page">
            <div className="container">
                <h1 className="title">Monster Compendium</h1>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                <div className="filter-section">
                    <label htmlFor="monsterBand" className="label">
                        Select Monster Type:
                    </label>
                    <select
                        id="monsterBand"
                        value={selectedTypeId}
                        onChange={handleTypeChange}
                        disabled={loadingTypes}
                        className="select"
                    >
                        <option value="">-- Choose a Monster Type --</option>
                        {monsterBands.map(type => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>

                {loadingMonsters && (
                    <div className="loading">
                        Loading monsters...
                    </div>
                )}

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
                                        <h3 className="detail-title">{selectedMonster.name}</h3>
                                        <div className="detail-section">
                                            <div className="detail-label">Monster ID:</div>
                                            <div className="detail-value">{selectedMonster.id}</div>
                                        </div>
                                        <div className="detail-section">
                                            <div className="detail-label">Type ID:</div>
                                            <div className="detail-value">{selectedMonster.monsterBandId}</div>
                                        </div>
                                        <div className="detail-section">
                                            <div className="detail-label">Type:</div>
                                            <div className="detail-value">
                                                {monsterBands.find(t => t.id === selectedMonster.monsterBandId)?.name || 'Unknown'}
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

                {!loadingMonsters && selectedTypeId && monsters.length === 0 && (
                    <div className="no-monsters">
                        No monsters found for this type.
                    </div>
                )}
            </div>
        </div>
    );
}

export default MonsterCompendium;