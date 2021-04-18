import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import TableData from './TableData'
import { MY_EQUIPMENT } from '../queries'
import { ADD_EQUIPMENT } from '../mutations'

const Equipment = ({ show }) => {

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

    await addEquipment({
      variables: {
        category: category,
        weight: parseInt(weight)
      }
    })

    console.log(`Creating a new piece of equipment category: ${category} weight: ${weight}`)

    setCategory('')
    setWeight('')
  }

  // Available Equipment Hook
  useEffect(() => {
    if (green.data) {
      setAvailable(green.data.myEquipment)
    }
  }, [green.data]) // eslint-disable-line

  // Equipment on hold Hook
  useEffect(() => {
    if (yellow.data) {
      setOnHold(yellow.data.myEquipment)
    }
  }, [yellow.data]) // eslint-disable-line

  // Equipment checked out Hook
  useEffect(() => {
    if (red.data) {
      setCheckedOut(red.data.myEquipment)
    }
  }, [red.data]) // eslint-disable-line

  if (!show) {
    return null
  } else if (green.loading || yellow.loading || red.loading) {
    return <div>loading...</div>
  } else if (green.error || yellow.error || red.error) {
    return <div>Error retrieving Marketplace data</div>
  }

  return(
    <div>
      <h1>My Equipment</h1>

      <TableData label="Available Equipment" equipment={available}/>
      <TableData label="Equipment Placed on Hold" equipment={onHold} />
      <TableData label="Equipment Checked Out" equipment={checkedOut} />
      <br/>
      <br/>
      <br/>
      {/* Will add form validation after and add CSS styles, specifically the margin to get rid of the br elements*/}
      <form onSubmit={newEquipment}>
        <div>
          Category
          <input
            value={category}
            onChange={({ target }) => setCategory(target.value)}
          />
        </div>
        <div>
          Weight
          <input
            value={weight}
            onChange={({ target }) => setWeight(target.value)}
          />
        </div>
        <button type='submit'>Add Equipment</button>
      </form>
    </div>
    

    
  )
}

export default Equipment