import React from 'react'

const TableData = ({ transactions, columnLabel }) => {
  
  return (
    <div className="card">
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
          </tr>
          {transactions.map(e =>
            <tr key={e.id}>
              <td>{e.category}</td>
              <td>{e.weight}</td>
              <td>{e.check_out_timestamp}</td>
              <td>{e.check_in_timestamp}</td>
              <td><img src={e.avatar_url} alt="Gym Leader" className="avatar" /></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TableData