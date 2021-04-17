import { gql } from '@apollo/client'

export const PLACE_HOLD = gql`
  mutation{
    placeHold(
      id: $id
    ) {
      category
      weight
      id
      transaction_id
      hold_user_id
    }
  }
`