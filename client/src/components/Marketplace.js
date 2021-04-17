import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import TableData from './TableData'

const ALL_OTHER_EQUIPMENT = gql`
  query filterOtherEquipmentByType($type: String!){
    allOtherEquipment(
      type: $type
    ) {
      id,
      category,
      weight,
      name,
      number,
      avatar
    }
  }
`

const Marketplace = () => {

  // Application State
  const [available, setAvailable] = useState([])
  const [onHold, setOnHold] = useState([])
  const [checkedOut, setCheckedOut] = useState([])

  // Defining the useQuery Hooks
  const green = useQuery(ALL_OTHER_EQUIPMENT, { variables: { type: "available" } })
  const yellow = useQuery(ALL_OTHER_EQUIPMENT, { variables: { type: "hold" } })
  const red = useQuery(ALL_OTHER_EQUIPMENT, { variables: { type: "checked out" } })

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
      return <div>Error retrieving Book data</div>
  }

  return(
    <div>
      <h1>
        Marketplace
      </h1>

      <TableData label="Available Equipment" equipment={available} buttonLabel="Place Hold" />
      <TableData label="Equipment Placed on Hold" equipment={onHold} />
      <TableData label="Equipment Checked Out" equipment={checkedOut} />
    </div>
  )
}

export default Marketplace