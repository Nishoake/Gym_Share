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