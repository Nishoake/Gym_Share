import React from 'react'

const TablePersonal = ({ label, equipment, eventHandler, buttonLabel }) => {
  
  return (
    <div className="card">
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
          </tr>
          {equipment.map(e =>
            <tr key={e.id}>
              <td>{e.category}</td>
              <td>{e.weight}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TablePersonal