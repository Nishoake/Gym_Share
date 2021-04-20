import React, { useState, useEffect }from 'react'
import { useQuery } from '@apollo/client'
import { MY_BORROWING_HISTORY } from '../queries'
import TableHistory from './TableHistory'
import Input from './Input'

const BorrowingHistory = ({ show, token }) => {

  // Application State
  const [transactions, setTransactions] = useState([])
  const [weightQuery, setWeightQuery] = useState('')
  const [categoryQuery, setCategoryQuery] = useState('')
  const [borrowerQuery, setBorrowerQuery] = useState('')
  // const [selectedEquipment, setSelectedEquipment] = useState(null)

  // Defining the useQuery Hooks
  const ledger = useQuery(MY_BORROWING_HISTORY)

  // Transactions useEffect Hook
  useEffect(() => {
    if (ledger.data) {
      setTransactions(ledger.data.myBorrowingHistory)
    }
  }, [ledger.data]) // eslint-disable-line

  // Render filtered results of transactions array
  const queryFilter = async () => {
    // Filter transactions by weight
    async function weightFilter(arrayToFilter) {
      const weightFilteredTransactions = arrayToFilter.filter(t => t.weight.toUpperCase() === weightQuery.toUpperCase())

      return weightFilteredTransactions
    }

    // Filter transactions by category
    async function categoryFilter(arrayToFilter) {
      const categoryFilteredTransactions = arrayToFilter.filter(t => t.category.toUpperCase() === categoryQuery.toUpperCase())

      return categoryFilteredTransactions
    }

    // Filter transactions by borrower
    async function borrowerFilter(arrayToFilter) {
      const borrowerFilteredTransactions = arrayToFilter.filter(t => t.name.toUpperCase() === borrowerQuery.toUpperCase())

      return borrowerFilteredTransactions
    }

    if(weightQuery || categoryQuery || borrowerQuery){
      return weightFilter(await categoryFilter(await borrowerFilter(transactions)))
    } else
      return transactions
  }

  // Controlled Component Functions
  const handleWeightQuery = (event) => {
    console.log(event.target.value)
    setWeightQuery(event.target.value)
  }

  const handleCategoryQuery = (event) => {
    console.log(event.target.value)
    setCategoryQuery(event.target.value)
  }

  const handleBorrowerQuery = (event) => {
    console.log(event.target.value)
    setBorrowerQuery(event.target.value)
  }

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

      <Input
        label="Filter by Weight"
        newInfo={weightQuery}
        handleInfoChange={handleWeightQuery}
      />
      <Input
        label="Filter by Category"
        newInfo={categoryQuery}
        handleInfoChange={handleCategoryQuery}
      />
      <Input
        label="Filter by Borrower Name"
        newInfo={weightQuery}
        handleInfoChange={handleBorrowerQuery}
      />
      <button
        onclick={() => console.log('button clicked')}
      />
      <br/>

      <TableHistory transactions={queryFilter} columnLabel="Lender" />
    </div>
  )
}

export default BorrowingHistory