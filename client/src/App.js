import React, { useState } from 'react'
// Importing React-Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
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
    <div>
    {/* <div className="container"> */}

      <Router>
        <div className="sidebar">
          <NavLink to="/"><h1 className="logo">GYM SHARE</h1></NavLink>
          <NavLink to="/marketplace" className="link nav-select" activeStyle={{
            fontWeight: "bold",
            color: "white"
          }}>Marketplace</NavLink>
          <NavLink to="/equipment" className="link nav-select" activeStyle={{
            fontWeight: "bold",
            color: "white"
          }}>My Equipment</NavLink>
          <NavLink to="/borrowingHistory" className="link nav-select" activeStyle={{
            fontWeight: "bold",
            color: "white"
          }}>Borrowing History</NavLink>
          <NavLink to="/lendingHistory" className="link nav-select" activeStyle={{
            fontWeight: "bold",
            color: "white"
          }}>Lending History</NavLink>
          {/* <Link to="/profile" className="link nav-select">Profile</Link> */}
          <button className="logout-button">Logout</button>
        </div>

        {/* <div className="topbar">
          <header>
            Gym Share
          </header>
        </div> */}
        <div className="main">
          <Switch>
            <Route exact={true} path="/">
              <Profile />
            </Route>
            <Route exact={true} path="/marketplace">
              <Marketplace />
            </Route>
            <Route exact={true} path="/equipment">
              <Equipment />
            </Route>
            <Route exact={true} path="/borrowingHistory">
              <BorrowingHistory />
            </Route>
            <Route exact={true} path="/lendingHistory">
              <LendingHistory />
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