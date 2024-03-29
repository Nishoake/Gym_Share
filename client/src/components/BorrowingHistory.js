import React, { useState, useEffect }from 'react'
import { useQuery } from '@apollo/client'
import { MY_BORROWING_HISTORY } from '../queries'
import TableHistory from './TableHistory'
const BorrowingHistory = () => {

  // Application State
  const [transactions, setTransactions] = useState([])
  const [weightQuery, setWeightQuery] = useState('')
  const [categoryQuery, setCategoryQuery] = useState('')
  const [lenderQuery, setLenderQuery] = useState('')

  // Defining the useQuery Hooks
  const ledger = useQuery(MY_BORROWING_HISTORY)

  // Transactions useEffect Hook
  useEffect(() => {
    if (ledger.data) {
      setTransactions(ledger.data.myBorrowingHistory)
    }
  }, [ledger.data])

  // Controlled Component Functions
  const handleWeightQuery = (event) => {
    console.log(event.target.value)
    setWeightQuery(event.target.value)
  }

  const handleCategoryQuery = (event) => {
    console.log(event.target.value)
    setCategoryQuery(event.target.value)
  }

  const handleLenderQuery = (event) => {
    console.log(event.target.value)
    setLenderQuery(event.target.value)
  }

  if (ledger.loading) {
    return <div>loading...</div>
  } else if (ledger.error) {
    return <div>Error retrieving Borrowing History data</div>
  } else if (!ledger.data.myBorrowingHistory.length) {
    return <div className="view-header"><h1>You have not borrowed any equipment yet</h1></div>
  }

  // Creating a set of all the unique weight values
  const weightSet = new Set()
  ledger.data.myBorrowingHistory.map(t => weightSet.add(t.weight))
  const uniqueWeights = [...weightSet]

  // Event handler for all weights
  const filterWeight = (weight) => {
    const shortLedger = ledger.data.myBorrowingHistory.filter(t => t.weight === weight)

    setTransactions(shortLedger)
  }

  // Creating a set of all the unique equipment category values
  const categorySet = new Set()
  ledger.data.myBorrowingHistory.map(t => categorySet.add(t.category))
  const uniqueCategories = [...categorySet]

  // Event handler for all categories
  const filterCategory = (category) => {
    const shortLedger = ledger.data.myBorrowingHistory.filter(t => t.category === category)

    setTransactions(shortLedger)
  }

  // Creating a set of all the unique lenders
  const lenderSet = new Set()
  ledger.data.myBorrowingHistory.map(t => lenderSet.add(t.name))
  const uniqueLenders = [...lenderSet]

  // Event handler for all categories
  const filterLender = (lender) => {
    const shortLedger = ledger.data.myBorrowingHistory.filter(t => t.name === lender)

    setTransactions(shortLedger)
  }

  // Respective reset event handler
  const reset = () => {
    setTransactions(ledger.data.myBorrowingHistory)
  }

  return (
    <div>
      <h1 className="view-header">
        My Borrowing History
      </h1>
      <h3 className="view-header">
        Breakdown of Your Borrowing:
      </h3>
      <div className="view-header">
        <table>
          <tbody>
            <tr>
              <td>
                Weights:
              </td>
              <td>
                {uniqueWeights.map(weight =>
                  <button key={weight} className='filter-button' type='button' onClick={() => filterWeight(weight)}>{weight} lb</button>
                )}
              </td>
            </tr>
            <tr>
              <td>
                Categories:
              </td>
              <td>
                {uniqueCategories.map(category =>
                  <button key={category} className='filter-button' type='button' onClick={() => filterCategory(category)}>{category}</button>
                )}
              </td>
            </tr>
            <tr>
              <td>
                Lenders:
              </td>
              <td>
                {uniqueLenders.map(lender =>
                  <button key={lender} className='filter-button' type='button' onClick={() => filterLender(lender)}>{lender}</button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <button type='button' onClick={() => reset()}>Reset Filters</button>
      </div>

      <br/>
      <br/>
      <br/>

      <h2 className="view-header">
        Ledger of Transactions
      </h2>
      <div className="rows">
        <TableHistory transactions={transactions} columnLabel="Lender" />
      </div>
    </div>
  )
}

export default BorrowingHistory