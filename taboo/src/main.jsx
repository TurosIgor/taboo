import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css'

import HomePage from './pages/HomePage/HomePage'
import Play from './pages/Play/Play'
import Teams from './pages/Teams/Teams'
import Game from './pages/Game/Game'
import Results from './pages/Results/Results'
import HowToPlay from './pages/HowToPlay/HowToPlay'
import Root from './pages/Root/Root'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />} >
          <Route path="/" element={<HomePage />} />
          <Route path="/play" element={<Play />} >
            <Route path="/play/teams" element={<Teams />} />
            <Route path="/play/game" element={<Game />} />
            <Route path="/play/results" element={<Results />} />
          </Route>
          <Route path="/howTo" element={<HowToPlay />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
