import React from 'react'

const TableData = ({ transactions, columnLabel }) => {
  
  return (
    <div>
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
              Checkout
            </th>
            <th>
              Checkin
            </th>
            <th>
              {columnLabel}
              </th>
            <th>
              Number
            </th>
          </tr>
          {transactions.map(e =>
            <tr key={e.id}>
              <td>{e.category}</td>
              <td>{e.weight}</td>
              <td>{e.check_out_timestamp}</td>
              <td>{e.check_in_timestamp}</td>
              <td>{e.name}</td>
              <td>{e.number}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TableData