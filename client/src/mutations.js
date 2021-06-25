import { gql } from '@apollo/client'

export const PLACE_HOLD = gql`
  mutation placeHold($id: String!){
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

export const ADD_EQUIPMENT = gql`
  mutation addNewEquipment($category: String!, $weight: Int!){
    addEquipment(
      category: $category,
      weight: $weight
    ) {
      category,
      weight,
      id,
      user_id,
      transaction_id,
      hold_user_id
    }
  }
`

export const REMOVE_HOLD = gql`
  mutation removeHold($id: String!){
    removeHold(
      id: $id
    ) {
      category,
      weight,
      id,
      user_id
      transaction_id,
      hold_user_id
    }
  }
`

export const CANCEL_MY_HOLD = gql`
  mutation cancelMyHold($id: String!){
    cancelMyHold(
      id: $id
    ) {
      category,
      weight,
      id,
      user_id
      transaction_id,
      hold_user_id
    }
  }
`

export const CHECK_OUT = gql`
  mutation checkOut($id: String!){
    removeHold(
      id: $id
    ) {
      id,
      borrower_id,
      lender_id,
      equipment_id,
      check_out_timestamp,
      check_in_timestamp
    }
  }
`

export const CHECK_IN = gql`
  mutation checkIn($id: String!){
    removeHold(
      id: $id
    ) {
      id,
      borrower_id,
      lender_id,
      equipment_id,
      check_out_timestamp,
      check_in_timestamp
    }
  }
`