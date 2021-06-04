import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import TableHistory from './TableData'
import { ALL_OTHER_EQUIPMENT } from '../queries'
import { PLACE_HOLD } from '../mutations'

const Marketplace = () => {

  // Application State
  const [available, setAvailable] = useState([])
  const [onHold, setOnHold] = useState([])
  const [checkedOut, setCheckedOut] = useState([])

  // Defining the useQuery Hooks
  const green = useQuery(ALL_OTHER_EQUIPMENT, { variables: { type: "available" } })
  const yellow = useQuery(ALL_OTHER_EQUIPMENT, { variables: { type: "hold" } })
  const red = useQuery(ALL_OTHER_EQUIPMENT, { variables: { type: "checked out" } })

  // Defining useMutation Hook for placing holds
  const [addHold] = useMutation(PLACE_HOLD, {
    refetchQueries: [
      {
        query: ALL_OTHER_EQUIPMENT,
        variables: { type: "available" }
      },
      {
        query: ALL_OTHER_EQUIPMENT,
        variables: { type: "hold" }
      },
    ]
  })

  // Event handler we will render to call the mutation, addHold
  const placeHold = async (equipment) => {
    await addHold({
      variables: { id: equipment }
    })

    console.log(`Placing a hold on equipment id: ${equipment}`)
  }


  // Available Equipment Hook
  useEffect(() => {
    if (green.data) {
      setAvailable(green.data.allOtherEquipment)
    }
  }, [green.data]) // eslint-disable-line

  // Equipment on hold Hook
  useEffect(() => {
    if(yellow.data){
      setOnHold(yellow.data.allOtherEquipment)
    }
  }, [yellow.data]) // eslint-disable-line

  // Equipment checked out Hook
  useEffect(() => {
    if(red.data){
      setCheckedOut(red.data.allOtherEquipment)
    }
  }, [red.data]) // eslint-disable-line

  if (green.loading || yellow.loading || red.loading)  {
    return <div>loading...</div>
  } else if (green.error || yellow.error || red.error) {
      return <div>Error retrieving Marketplace data</div>
  }

  return(
    <div>
      <h1 className="view-header">
        Marketplace
      </h1>

      <TableHistory label="Available Equipment" equipment={available} eventHandler={placeHold} buttonLabel="Place Hold" />
      <TableHistory label="Equipment Placed on Hold" equipment={onHold} />
      <TableHistory label="Equipment Checked Out" equipment={checkedOut} />
    </div>
  )
}

export default Marketplace