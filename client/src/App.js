import React, { useState } from 'react'
import Marketplace from './components/Marketplace'
import Equipment from './components/Equipment'
import './App.css'

function App() {
  const [page, setPage] = useState('marketPlace')
  
  return (
    <div>
      <header>
        Gym Share
      </header>
      <div>
        <button onClick={() => setPage('marketPlace')}>Marketplace</button>
        <button onClick={() => setPage('equipment')}>My Equipment</button>
        <button onClick={() => setPage('borrowingHistory')}>Borrowing History</button>
        <button onClick={() => setPage('lendingHistory')}>Lending History</button>
        <button onClick={() => setPage('profile')}>Profile</button>
        <button onClick={() => setPage()}>Log Out</button>
      </div>

      <Marketplace
        show={page === 'marketPlace'}
      />

      <Equipment
        show={page === 'equipment'}
      />
    </div>
  )
}

export default App