import React from 'react'

const TableData = ({ label, equipment, eventHandler, buttonLabel }) => {
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
              <td>{e.avatar}</td>
              <td><button onClick={() => eventHandler(e.id)}>{buttonLabel}</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TableData