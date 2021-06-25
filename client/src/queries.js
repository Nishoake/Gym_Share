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
      avatar_url
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
      avatar_url
    }
  }
`

export const MY_BORROWING_HISTORY = gql`
  query{
    myBorrowingHistory{
      id,
      category,
      weight,
      check_out_timestamp,
      check_in_timestamp,
      name,
      number,
      avatar_url
    }
  }
`

export const MY_LENDING_HISTORY = gql`
  query{
    myLendingHistory{
      id,
      category,
      weight,
      check_out_timestamp,
      check_in_timestamp,
      name,
      number,
      avatar_url
    }
  }
`

export const MY_ACCOUNT = gql`
  query{
    myAccount{
      name,
      number,
      email,
      house,
      street,
      city,
      avatar_url
    }
  }
`

export const EQUIPMENT_COUNT = gql`
  query{
    equipmentCount
  }
`

export const MY_HOLDS = gql`
  query{
    myHolds{
      id,
      category,
      weight,
      avatar_url
    }
  }
`

export const MY_CHECKOUTS = gql`
  query{
    myCheckOuts{
      id,
      category,
      weight,
      avatar_url
    }
  }
`