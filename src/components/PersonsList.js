import React from 'react'

const PersonsList = ({showPersons, onDelete}) => {

  return(
      <ul>
      {showPersons.map(person => 
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={()=>onDelete(person)}>delete</button>
        </li>
      )}
  </ul>
  )
    
}

export default PersonsList