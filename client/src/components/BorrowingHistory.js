import React, { useState, useEffect }from 'react'
import { useQuery } from '@apollo/client'
import { MY_BORROWING_HISTORY } from '../queries'
import TableHistory from './TableHistory'

const BorrowingHistory = ({ show, token }) => {

  // Application State
  const [transactions, setTransactions] = useState([])

  // Defining the useQuery Hooks
  const ledger = useQuery(MY_BORROWING_HISTORY)

  // Transactions useEffect Hook
  useEffect(() => {
    if (ledger.data) {
      setTransactions(ledger.data.myBorrowingHistory)
    }
  }, [ledger.data]) // eslint-disable-line

  if (!show) {
    return null
  } else if (ledger.loading) {
    return <div>loading...</div>
  } else if (ledger.error) {
    return <div>Error retrieving Borrowing History data</div>
  }

  return (
    <div>
      <h1>
        My Borrowing History
      </h1>

      <TableHistory transactions={transactions} columnLabel="Borrower" />
    </div>
  )
}

export default BorrowingHistory