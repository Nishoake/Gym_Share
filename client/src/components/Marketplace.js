import React from 'react'
import { gql, useQuery } from '@apollo/client'

const ALL_EQUIPMENT = gql`
  query{
    allEquipment{
      id,
      user_id,
      category,
      weight,
      transaction_id,
      hold_user_id
    }
  }
`

const Marketplace = () => {
  const result = useQuery(ALL_EQUIPMENT)

  if(result.loading)  {
    return <div>loading...</div>
  }

  return(
    <div>
      {result.data.allEquipment.map(p => p.weight).join(', ')}
      {/* {result.data} */}
    </div>
  )
}

export default Marketplace