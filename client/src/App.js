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
  const [page, setPage] = useState('marketPlace')
  
  return (
    <div className="container">

      <Router>
        <div className="sidebar">
          <Link to="/">Marketplace</Link>
          <Link to="/equipment">My Equipment</Link>
          <Link to="/borrowingHistory">Borrowing History</Link>
          <Link to="/lendingHistory">Lending History</Link>
          <Link to="/profile">Profile</Link>
        </div>

        <div className="topbar">
          <header>
            Gym Share
          </header>
        </div>
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