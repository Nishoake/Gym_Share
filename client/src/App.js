import React, { useState, useEffect } from 'react'
// Importing React-Router
import {
  // BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  NavLink
} from "react-router-dom"

// import { useQuery } from '@apollo/client'
// import { MY_ACCOUNT } from './queries'
import Marketplace from './components/Marketplace'
import Equipment from './components/Equipment'
import BorrowingHistory from './components/BorrowingHistory'
import LendingHistory from './components/LendingHistory'
import Profile from './components/Profile'
import './App.css'

// Defining constants for faster loading
const profilePictureURL = 'https://cdn2.bulbagarden.net/upload/7/75/VSBrock_Masters.png'
const userName = 'Brock'

function App() {
  return (
    <div>

      <HashRouter>
        <div className="sidebar-desktop">
          <div className="sidebar">
            <NavLink to="/">
              <h1 className="logo mobile-only">GYM SHARE</h1>
              <div className="welcome desktop-only">
                <img src={profilePictureURL} alt="Profile Picture" className="avatar" />
                Welcome {userName}!
              </div>
            </NavLink>


            <NavLink 
              to="/marketplace" 
              className="link nav-select" 
              activeStyle={{
                fontWeight: "bold",
                color: "white"
              }}
            >
              <i className="fas fa-store icon-spacing" />
              Marketplace
            </NavLink>

            <NavLink 
              to="/equipment" 
              className="link nav-select" 
              activeStyle={{
                fontWeight: "bold",
                color: "white"
              }}
            >
              <i class="fas fa-dumbbell icon-spacing" />
              Equipment
            </NavLink>

            <NavLink 
              to="/borrowingHistory" 
              className="link nav-select" 
              activeStyle={{
                fontWeight: "bold",
                color: "white"
              }}
            >
              <i class="fas fa-hand-holding-medical icon-spacing" />
              Borrowing History
            </NavLink>

            <NavLink 
              to="/lendingHistory" 
              className="link nav-select" 
              activeStyle={{
                fontWeight: "bold",
                color: "white"
              }}
            >
              <i class="fas fa-handshake icon-spacing" />
              Lending History
            </NavLink>


            {/* Disabled logout button for demo purposes */}
            {/* <button className="logout-button" disabled><i class="fas fa-sign-out-alt icon-spacing"/>Logout</button> */}
          </div>
        </div>

        <div className="sidebar-mobile">
          <div className="sidebar">
            <NavLink to="/" className="footer">
              <img src={profilePictureURL} alt="Profile Picture" className="avatar" />
                <h6>Dashboard</h6>
            </NavLink>

            <NavLink 
              to="/marketplace" 
              className="footer"
              activeStyle={{
                fontWeight: "bold",
                color: "white"
              }}
            >
              <i className="fas fa-store fa-2x" />
              <h6>Marketplace</h6>
            </NavLink>

            
            <NavLink 
              to="/equipment" 
              className="footer"
              activeStyle={{
                fontWeight: "bold",
                color: "white"
              }}
            >
              <i className="fas fa-dumbbell fa-2x icon-mobile" />
              <div className="caption">
                <h6>Equipment</h6>
              </div>
            </NavLink>
           

            <NavLink 
              to="/borrowingHistory" 
              className="footer"
              activeStyle={{
                fontWeight: "bold",
                color: "white"
              }}
            >
              <i class="fas fa-hand-holding-medical fa-2x" />
              <h6>Borrowing History</h6>
            </NavLink>

            <NavLink 
              to="/lendingHistory" 
              className="footer"
              activeStyle={{
                fontWeight: "bold",
                color: "white"
              }}
            >
              <i class="fas fa-handshake fa-2x" />
              <h6>Lending History</h6>
            </NavLink>


            {/* Disabled logout button for demo purposes */}
            {/* <button className="logout-button" disabled><i class="fas fa-sign-out-alt icon-spacing"/>Logout</button> */}
          </div>
        </div>

        


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
      

    </div>
  )
}

export default App