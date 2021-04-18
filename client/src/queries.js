import { gql } from '@apollo/client'

export const ALL_OTHER_EQUIPMENT = gql`
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

export const MY_EQUIPMENT = gql`
  query filterMyEquipmentByType($type: String!){
    myEquipment(
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