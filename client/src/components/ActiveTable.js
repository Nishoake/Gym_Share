import React from 'react'

const ActiveTable = ({ primaryLabel, secondaryLabel, equipment, primaryFunction, secondaryFunction, primaryButtonLabel, secondaryButtonLabel }) => {
  if(equipment.length){
    if (secondaryFunction && secondaryButtonLabel){
      return (
        <div className="card">
          <h2 style={{ "text-decoration": "underline" }}>{primaryLabel}</h2>
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
                  {secondaryLabel}
                </th>
              </tr>
              {equipment.map(e =>
                <tr key={e.id}>
                  <td>{e.category}</td>
                  <td>{e.weight}</td>
                  <td><img src={e.avatar_url} alt="Gym Leader" className="avatar" /></td>
                  <td><button onClick={() => primaryFunction(e.id)}>{primaryButtonLabel}</button></td>
                  <td><button onClick={() => secondaryFunction(e.id)}>{secondaryButtonLabel}</button></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )
    }
    if (primaryFunction && primaryButtonLabel) {
      return (
        <div className="card">
          <h2 style={{ "text-decoration": "underline" }}>{primaryLabel}</h2>
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
                  {secondaryLabel}
                </th>
              </tr>
              {equipment.map(e =>
                <tr key={e.id}>
                  <td>{e.category}</td>
                  <td>{e.weight}</td>
                  <td><img src={e.avatar_url} alt="Gym Leader" className="avatar" /></td>
                  <td><button onClick={() => primaryFunction(e.id)}>{primaryButtonLabel}</button></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )
    }

    return (
      <div className="card">
        <h2 style={{ "text-decoration": "underline" }}>{primaryLabel}</h2>
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
                {secondaryLabel}
              </th>
            </tr>
            {equipment.map(e =>
              <tr key={e.id}>
                <td>{e.category}</td>
                <td>{e.weight}</td>
                <td><img src={e.avatar_url} alt="Gym Leader" className="avatar" /></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )

  }
  
  return (
    <div className="card">
      <h2>{primaryLabel}</h2>
      <p>No active items</p>
    </div>
  )
}

export default ActiveTable