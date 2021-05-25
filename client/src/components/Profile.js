import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { MY_ACCOUNT } from '../queries'

const Profile = () => {

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


  if (account.loading) {
    return <div>loading...</div>
  } else if (account.error) {
    return <div>Error retrieving Marketplace data</div>
  }

  return(
    <div>
      <h1>Dashboard</h1>

      {/* <p><b>Name:</b> {info[0].name}</p>
      <p><b>Number:</b> {info[0].number}</p>
      <p><b>Email:</b> {info[0].email}</p>
      <p><b>House:</b> {info[0].house}</p>
      <p><b>Street:</b> {info[0].street}</p>
      <p><b>City:</b> {info[0].city}</p> */}
      <p><b>Name:</b> Brock Harrison</p>
      <p><b>Number:</b> 647-787-4515</p>
      <p><b>Email:</b> Brock@Kanto.com</p>
      <p><b>House:</b> 14</p>
      <p><b>Street:</b> Route 5</p>
      <p><b>City:</b> Pewter City</p>

    </div>
    

    
  )
}

export default Profile