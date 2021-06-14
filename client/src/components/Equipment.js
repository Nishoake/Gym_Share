import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import TablePersonal from './TablePersonal'
import { MY_EQUIPMENT } from '../queries'
import { ADD_EQUIPMENT, REMOVE_HOLD } from '../mutations'
import Select from 'react-select'

const Equipment = () => {

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

    if (category.value && weight.value){

      await addEquipment({
        variables: {
          category: category.value,
          weight: parseInt(weight.value)
        }
      })

      setCategory('')
      setWeight('')
    }

    return
  }

  // Defining useMutation Hook for removing a hold
  const [cancelHold] = useMutation(REMOVE_HOLD, {
    refetchQueries: [
      {
        query: MY_EQUIPMENT,
        variables: { type: "available" }
      },
      {
        query: MY_EQUIPMENT,
        variables: { type: "hold" }
      }
    ]
  })

  // Event handler we will render to call the mutation, cancelHold
  const holdRemove = async (event) => {
    event.preventDefault()

    await cancelHold()

    console.log(`Removing a hold placed on equipment`)
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

  // React-Select options
  // Will move to a config file
  const categoryOptions = [
    {
      value: 'Dumbbell',
      label: 'Dumbbell'
    },
    {
      value: 'Kettlebell',
      label: 'Kettlebell'
    }
  ]

  const weightOptions = [
    {
      value: 5,
      label: '5'
    },
    {
      value: 10,
      label: '10'
    },
    {
      value: 15,
      label: '15'
    },
    {
      value: 20,
      label: '20'
    },
    {
      value: 25,
      label: '25'
    },
    {
      value: 30,
      label: '30'
    },
    {
      value: 35,
      label: '35'
    },
    {
      value: 40,
      label: '40'
    },
    {
      value: 45,
      label: '45'
    },
    {
      value: 50,
      label: '50'
    },
    {
      value: 55,
      label: '55'
    },
    {
      value: 60,
      label: '60'
    },
    {
      value: 65,
      label: '65'
    },
    {
      value: 70,
      label: '70'
    },
    {
      value: 75,
      label: '75'
    },
    {
      value: 80,
      label: '80'
    },
    {
      value: 85,
      label: '85'
    },
    {
      value: 90,
      label: '90'
    },
    {
      value: 95,
      label: '95'
    },
    {
      value: 100,
      label: '100'
    },
  ]

  if (green.loading || yellow.loading || red.loading) {
    return <div>loading...</div>
  } else if (green.error || yellow.error || red.error) {
    return <div>Error retrieving Marketplace data</div>
  }

  return(
    <div>
      <h1 className="view-header">My Equipment</h1>

      <div className="rows">
        <TablePersonal label="Available" equipment={available}/>
        <TablePersonal label="On Hold" equipment={onHold} />
        <TablePersonal label="Checked Out" equipment={checkedOut} />
      </div>

      {/* Will add form validation after and add CSS styles, specifically the margin to get rid of the br elements*/}
      <div className="view-header">
        <form onSubmit={newEquipment}>
          <div>
            Category:
            <Select
              onChange={setCategory}
              options={categoryOptions}
              className='input-add-equip'
            />
          </div>
          <div>
            Weight:
            <Select
              onChange={setWeight}
              options={weightOptions}
              className='input-add-equip'
            />
          </div>
          <button type='submit' className='add-equip-button'>Add Equipment</button>
        </form>
      </div>
    </div>
  )
}

export default Equipment