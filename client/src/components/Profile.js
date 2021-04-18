import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { MY_ACCOUNT } from '../queries'

const Profile = ({ show }) => {

  // Application State
  const [info, setInfo] = useState([])

  // Defining the useQuery Hooks
  const account = useQuery(MY_ACCOUNT)

  // Available Equipment Hook
  useEffect(() => {
    if (account.data) {
      setInfo(account.data.myAccount)
    }
  }, [account.data]) // eslint-disable-line


  if (!show) {
    return null
  } else if (account.loading) {
    return <div>loading...</div>
  } else if (account.error) {
    return <div>Error retrieving Marketplace data</div>
  }

  return(
    <div>
      <h1>My Account</h1>

      <p>Name: {info[0].name}</p>
      <p>Number: {info[0].number}</p>
      <p>Email: {info[0].email}</p>
      <p>House: {info[0].house}</p>
      <p>Street: {info[0].street}</p>
      <p>City: {info[0].city}</p>

    </div>
    

    
  )
}

export default Profile