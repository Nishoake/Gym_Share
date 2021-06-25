import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { MY_ACCOUNT, EQUIPMENT_COUNT, MY_HOLDS, MY_CHECKOUTS } from '../queries'
import { CANCEL_MY_HOLD } from '../mutations'
import ActiveTable from './ActiveTable'

const Profile = () => {

  // Application State
  const [info, setInfo] = useState([])
  const [count, setCount] = useState(null)
  const [holds, setHolds] = useState([])
  const [checkOuts, setCheckOuts] = useState([])

  // Defining the useQuery Hooks
  const account = useQuery(MY_ACCOUNT)
  const equipmentCount = useQuery(EQUIPMENT_COUNT)
  const myHolds = useQuery(MY_HOLDS)
  const myCheckOuts = useQuery(MY_CHECKOUTS)

  // Profile Info Hook
  useEffect(() => {
    if (account.data) {
      setInfo(account.data.myAccount[0])
    }
  }, [account.data]) // eslint-disable-line

  // Available Equipment Hook
  useEffect(() => {
    if (equipmentCount.data) {
      setCount(equipmentCount.data.equipmentCount)
    }
  }, [equipmentCount.data]) // eslint-disable-line

  // Holds Hook
  useEffect(() => {
    if (myHolds.data) {
      setHolds(myHolds.data.myHolds)
    }
  }, [myHolds.data]) // eslint-disable-line

  // CheckOuts Hook
  useEffect(() => {
    if (myCheckOuts.data) {
      setCheckOuts(myCheckOuts.data.myCheckOuts)
    }
  }, [myCheckOuts.data]) // eslint-disable-line

  // Remove Hold
  // Defining useMutation Hook for removing a hold
  const [cancelHold] = useMutation(CANCEL_MY_HOLD, {
    refetchQueries: [
      {
        query: MY_HOLDS
      }
    ]
  })

  // Event handler we will render to call the mutation, cancelHold
  const holdRemove = async (equipment) => {

    await cancelHold({
      variables: { id: equipment }
    })
  }


  if (account.loading && equipmentCount.loading && myHolds.loading && myCheckOuts.loading) {
    return <div>loading...</div>
  } else if (account.error || equipmentCount.error || myHolds.error || myCheckOuts.error) {
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

            <p><b># of Equipment on Platform:</b></p>
            <h1>{count}</h1>
            
          </div>
        </div>
        <div className="rows">

          <ActiveTable primaryLabel="Equipment I Have Requested:" secondaryLabel="Owner" equipment={holds} primaryFunction={holdRemove} primaryButtonLabel="Cancel Hold"/>
          
          <ActiveTable primaryLabel="Equipment I Have Checked Out:" secondaryLabel="Owner" equipment={checkOuts} />

        </div>
        

    </div>
    

    
  )
}

export default Profile