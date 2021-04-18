import React from 'react'
// import { useState } from 'react'
// import { useMutation, useQuery } from '@apollo/client'

const BorrowingHistory = ({ show, token }) => {
  if (!show) {
    return null
  }

  return (
    <div>
      <h1>
        BorrowingHistory
      </h1>
    </div>
  )
}

export default BorrowingHistory