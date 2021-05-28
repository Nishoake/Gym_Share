import React from 'react'

const TableHistory = ({ label, equipment, eventHandler, buttonLabel }) => {
  // if(equipment[0]) {
  //   console.log(`Equipment Array = ${JSON.stringify(equipment)}`)
  //   console.log(`1st ID = ${equipment[1].id}`)
  // }
  
  return (
    <div>
      <h2>{label}</h2>
      <table>
        <tbody>
          <tr>
            <th>
              Category
            </th>
            <th>
              Weight
            </th>
            <th>
              Owner
            </th>
            <th>
              Number
            </th>
            <th>
              Avatar {/* Might leave empty as it is self explanatory */}
            </th>
            <th>
              {buttonLabel}
            </th>
          </tr>
          {equipment.map(e =>
            <tr key={e.id}>
              <td>{e.category}</td>
              <td>{e.weight}</td>
              <td>{e.name}</td>
              <td>{e.number}</td>
              <td><img src={e.avatar_url} alt="Gym Leader" className="avatar"/></td>
              <td><button onClick={() => eventHandler(e.id)}>{buttonLabel}</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TableHistory