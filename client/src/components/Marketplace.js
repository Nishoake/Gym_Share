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
  const [available, setAvailable] = useState([])

  const green = useQuery(ALL_OTHER_EQUIPMENT, { variables: { type: "available" } })

  useEffect(() => {
    if (green.data) {
      setAvailable(green.data.allOtherEquipment)
      console.log(`available: ${available}`)
    }
  }, [green.data]) // eslint-disable-line

  if(green.loading)  {
    return <div>loading...</div>
  } else if (green.error) {
      console.log(`Error = ${green.error}`)
      return <div>Error retrieving Book data</div>
  }

  return(
    <div>
      <h1>
        Marketplace
      </h1>

      <TableData label="Available Equipment" equipment={available} buttonLabel="Place Hold" />
    </div>
  )
}

export default Marketplace