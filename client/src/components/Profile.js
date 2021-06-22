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
      setInfo(account.data.myAccount[0])
    }
  }, [account.data]) // eslint-disable-line


  if (account.loading) {
    return <div>loading...</div>
  } else if (account.error) {
    return <div>Error retrieving Dashboard data</div>
  }

  return(
    <div>
      <h1 className="view-header">Dashboard</h1>
        <div className="rows">
          <div className="card">
            <h2 style={{"text-decoration": "underline"}}>Account Info:</h2>

            <p><b>Name:</b> {info.name}</p>
            <p><b>Number:</b> {info.number}</p>
            <p><b>Email:</b> {info.email}</p>
            <p><b>House:</b> {info.house}</p>
            <p><b>Street:</b> {info.street}</p>
            <p><b>City:</b> {info.city}</p>
            
          </div>
          <div className="card">
            <h2 style={{"text-decoration": "underline"}}>Stats For Me:</h2>

            <p><b>Name:</b> {info.name}</p>
            <p><b>Number:</b> {info.number}</p>
            <p><b>Email:</b> {info.email}</p>
            <p><b>House:</b> {info.house}</p>
            <p><b>Street:</b> {info.street}</p>
            <p><b>City:</b> {info.city}</p>
            
          </div>
        </div>
        <div className="rows">
          <div className="card">
          <h2 style={{ "text-decoration": "underline" }}>Equipment I Have Requested On Hold:</h2>

            <p><b>Name:</b> {info.name}</p>
            <p><b>Number:</b> {info.number}</p>
            <p><b>Email:</b> {info.email}</p>
            <p><b>House:</b> {info.house}</p>
            <p><b>Street:</b> {info.street}</p>
            <p><b>City:</b> {info.city}</p>
            
          </div>
          <div className="card">
            <h2 style={{"text-decoration": "underline"}}>Equipment I Am Currently Borrowing:</h2>

            <p><b>Name:</b> {info.name}</p>
            <p><b>Number:</b> {info.number}</p>
            <p><b>Email:</b> {info.email}</p>
            <p><b>House:</b> {info.house}</p>
            <p><b>Street:</b> {info.street}</p>
            <p><b>City:</b> {info.city}</p>
            
          </div>
        </div>
        

    </div>
    

    
  )
}

export default Profile