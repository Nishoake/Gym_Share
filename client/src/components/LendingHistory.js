import React, { useState, useEffect }from 'react'
import { useQuery } from '@apollo/client'
import { MY_LENDING_HISTORY } from '../queries'
import TableHistory from './TableHistory'

const LendingHistory = ({ show, token }) => {

  // Application State
  const [transactions, setTransactions] = useState([])

  // Defining the useQuery Hooks
  const ledger = useQuery(MY_LENDING_HISTORY)

  // Transactions useEffect Hook
  useEffect(() => {
    if (ledger.data) {
      setTransactions(ledger.data.myLendingHistory)
    }
  }, [ledger.data]) // eslint-disable-line

  if (!show) {
    return null
  } else if (ledger.loading) {
    return <div>loading...</div>
  } else if (ledger.error) {
    return <div>Error retrieving Lending History data</div>
  }

  return (
    <div>
      <h1>
        My Lending History
      </h1>

      <TableHistory transactions={transactions} columnLabel="Borrower" />
    </div>
  )
}

export default LendingHistory