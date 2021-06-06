import React, { useState } from 'react'
// Importing React-Router
import {
  // BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  NavLink
} from "react-router-dom"

import Marketplace from './components/Marketplace'
import Equipment from './components/Equipment'
import BorrowingHistory from './components/BorrowingHistory'
import LendingHistory from './components/LendingHistory'
import Profile from './components/Profile'
import './App.css'

// Defining constants
const profilePictureURL = 'https://cdn2.bulbagarden.net/upload/7/75/VSBrock_Masters.png'
const userName = 'Brock'

function App() {

  return (
    <div>
    {/* <div className="container"> */}

      <HashRouter>
        <div className="sidebar">
          <NavLink to="/">
            <h1 className="logo">GYM SHARE</h1>
            <div className='welcome'>
              <img src={profilePictureURL} alt="Profile Picture" className="avatar" />
              Welcome {userName}!
            </div>
          </NavLink>
          <NavLink to="/marketplace" className="link nav-select" activeStyle={{
            fontWeight: "bold",
            color: "white"
          }}><i className="fas fa-store icon-spacing"/>Marketplace</NavLink>
          <NavLink to="/equipment" className="link nav-select" activeStyle={{
            fontWeight: "bold",
            color: "white"
          }}><i class="fas fa-dumbbell icon-spacing"/>My Equipment</NavLink>
          <NavLink to="/borrowingHistory" className="link nav-select" activeStyle={{
            fontWeight: "bold",
            color: "white"
          }}><i class="fas fa-arrow-left icon-spacing"/>Borrowing History</NavLink>
          <NavLink to="/lendingHistory" className="link nav-select" activeStyle={{
            fontWeight: "bold",
            color: "white"
          }}><i class="fas fa-arrow-right icon-spacing" />Lending History</NavLink>
          {/* Disabled logout button for demo purposes */}
          {/* <button className="logout-button" disabled><i class="fas fa-sign-out-alt icon-spacing"/>Logout</button> */}

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
        
      </HashRouter>
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