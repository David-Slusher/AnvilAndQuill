import {React, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import HeroicCompendium from './pages/Heroes/HeroicCompendium';
import MonsterCompendium from './pages/Monsters/MonsterCompendium';
import DirectorCompendium from './pages/Directors/DirectorCompendium';
import './App.css';
function App() {
    return (
        <Router >
        <div className="app">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/heroic" element={<HeroicCompendium />} />
                <Route path="/monster" element={<MonsterCompendium />} />
                <Route path="/director" element={<DirectorCompendium />} />
            </Routes>
        </div>
        </Router >
    );
}

export default App;