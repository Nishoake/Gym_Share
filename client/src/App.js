import React, { useState } from 'react'
// Importing React-Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
} from "react-router-dom"

import Marketplace from './components/Marketplace'
import Equipment from './components/Equipment'
import BorrowingHistory from './components/BorrowingHistory'
import LendingHistory from './components/LendingHistory'
import Profile from './components/Profile'
import './App.css'

function App() {

  return (
    <div className="container">

      <Router>
        <div className="sidebar">
          <h1 className="logo">GYM SHARE</h1>
          <Link to="/" className="link nav-select">Marketplace</Link>
          <Link to="/equipment" className="link nav-select">My Equipment</Link>
          <Link to="/borrowingHistory" className="link nav-select">Borrowing History</Link>
          <Link to="/lendingHistory" className="link nav-select">Lending History</Link>
          <Link to="/profile" className="link nav-select">Profile</Link>
        </div>

        {/* <div className="topbar">
          <header>
            Gym Share
          </header>
        </div> */}
        <div className="main">
          <Switch>
            <Route exact={true} path="/">
              <Marketplace />
            </Route>
            <Route path="/equipment">
              <Equipment />
            </Route>
            <Route path="/borrowingHistory">
              <BorrowingHistory />
            </Route>
            <Route path="/lendingHistory">
              <LendingHistory />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </div>
        
      </Router>
        {/* <button onClick={() => setPage('marketPlace')}>Marketplace</button>
        <button onClick={() => setPage('equipment')}>My Equipment</button>
        <button onClick={() => setPage('borrowingHistory')}>Borrowing History</button>
        <button onClick={() => setPage('lendingHistory')}>Lending History</button>
        <button onClick={() => setPage('profile')}>Profile</button>
        <button onClick={() => setPage()}>Log Out</button> */}
      
      
      {/* <div className="topbar">
        <header>
          Gym Share
        </header>
      </div>

      <div className="main">
        <Marketplace
          show={page === 'marketPlace'}
        />

        <Equipment
          show={page === 'equipment'}
        />

        <BorrowingHistory
          show={page === 'borrowingHistory'}
        />

        <LendingHistory
          show={page === 'lendingHistory'}
        />

        <Profile
          show={page === 'profile'}
        />
      </div> */}
      

    </div>
  )
}

export default App