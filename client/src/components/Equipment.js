import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import AvailableTable from './AvailableTable'
import ActiveTable from './ActiveTable'
import { MY_EQUIPMENT } from '../queries'
import { ADD_EQUIPMENT, REMOVE_HOLD, CHECK_OUT, CHECK_IN } from '../mutations'
import { categoryOptions, weightOptions } from '../data/options'
import Select from 'react-select'

const Equipment = () => {

  // Application State
  // Table State
  const [available, setAvailable] = useState([])
  const [onHold, setOnHold] = useState([])
  const [checkedOut, setCheckedOut] = useState([])
  // Form State
  const [category, setCategory] = useState('')
  const [weight, setWeight] = useState('')

  // Defining the useQuery Hooks
  const green = useQuery(MY_EQUIPMENT, { variables: { type: "available" } })
  const yellow = useQuery(MY_EQUIPMENT, { variables: { type: "hold" } })
  const red = useQuery(MY_EQUIPMENT, { variables: { type: "checked out" } })

  // DEFINING FUNCTIONALITY FOR ADDING, REMOVING, CHECKING OUT & CHECKING IN
  // Add Equipment
  // Defining useMutation Hook for adding new equipment
  const [addEquipment] = useMutation(ADD_EQUIPMENT, {
    refetchQueries: [
      {
        query: MY_EQUIPMENT,
        variables: { type: "available" }
      }
    ]
  })

  // Event handler we will render to call the mutation, addEquipment
  const newEquipment = async (event) => {
    event.preventDefault()

    if (category.value && weight.value){

      await addEquipment({
        variables: {
          category: category.value,
          weight: parseInt(weight.value)
        }
      })

      setCategory('')
      setWeight('')
    }

    return
  }

  // Remove Hold
  // Defining useMutation Hook for removing a hold
  const [cancelHold] = useMutation(REMOVE_HOLD, {
    refetchQueries: [
      {
        query: MY_EQUIPMENT,
        variables: { type: "available" }
      },
      {
        query: MY_EQUIPMENT,
        variables: { type: "hold" }
      }
    ]
  })

  // Event handler we will render to call the mutation, cancelHold
  const holdRemove = async (equipment) => {

    await cancelHold({
      variables: { id: equipment }
    })
  }

  // Check Out
  // Defining useMutation Hook for checking out
  const [checkOut] = useMutation(CHECK_OUT, {
    refetchQueries: [
      {
        query: MY_EQUIPMENT,
        variables: { type: "hold" }
      },
      {
        query: MY_EQUIPMENT,
        variables: { type: "checked out" }
      }
    ]
  })

  // Event handler we will render to call the mutation, cancelHold
  const takeOut = async (equipment) => {

    await checkOut({
      variables: { id: equipment }
    })

    console.log(`Checking back in equipment id: ${equipment}`)
  }

  // Check In
  // Defining useMutation Hook for checking in
  const [checkIn] = useMutation(CHECK_IN, {
    refetchQueries: [
      {
        query: MY_EQUIPMENT,
        variables: { type: "available" }
      },
      {
        query: MY_EQUIPMENT,
        variables: { type: "checked out" }
      }
    ]
  })

  // Event handler we will render to call the mutation, cancelHold
  const takeIn = async (transaction) => {

    await checkIn({
      variables: { id: transaction }
    })

    console.log(`Checking back in equipment, transaction id: ${transaction}`)
  }

  // Available Equipment Hook
  useEffect(() => {
    if (green.data) {
      setAvailable(green.data.myEquipment)
    }
  }, [green.data])

  // Equipment on hold Hook
  useEffect(() => {
    if (yellow.data) {
      setOnHold(yellow.data.myEquipment)
    }
  }, [yellow.data])

  // Equipment checked out Hook
  useEffect(() => {
    if (red.data) {
      setCheckedOut(red.data.myEquipment)
    }
  }, [red.data])

  if (green.loading || yellow.loading || red.loading) {
    return <div>loading...</div>
  } else if (green.error || yellow.error || red.error) {
    return <div>Error retrieving Marketplace data</div>
  }

  return(
    <div>
      <h1 className="view-header">My Equipment</h1>

      <div className="rows">
        <AvailableTable label="Available" equipment={available}/>
        <ActiveTable 
          primaryLabel="On Hold"
          secondaryLabel="Requested By"
          equipment={onHold}
          primaryFunction={holdRemove}
          secondaryFunction={takeOut}
          primaryButtonLabel="Remove Hold"
          secondaryButtonLabel="Check Out"
        />
        <ActiveTable 
          primaryLabel="Checked Out"
          secondaryLabel="Borrower"
          equipment={checkedOut}
          primaryFunction={takeIn}
          primaryButtonLabel="Check In"
        />
      </div>
      <div className="view-header">
        <form onSubmit={newEquipment}>
          <div>
            Category:
            <Select
              onChange={setCategory}
              options={categoryOptions}
              className='input-add-equip'
            />
          </div>
          <div>
            Weight:
            <Select
              onChange={setWeight}
              options={weightOptions}
              className='input-add-equip'
            />
          </div>
          <button type='submit' className='add-equip-button'>Add Equipment</button>
        </form>
      </div>
    </div>
  )
}

export default Equipment