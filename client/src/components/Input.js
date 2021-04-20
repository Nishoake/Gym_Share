import React from 'react'

const Input = ({ label, newInfo, handleInfoChange }) => {
  return (
    <div>
      {label} <input
        type="text"
        value={newInfo}
        onChange={handleInfoChange}
      />
    </div>
  )
}

export default Input