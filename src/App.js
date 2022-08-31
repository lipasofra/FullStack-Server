import { useState } from 'react'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '1234567', id: 1 },
    { name: 'Lina Lola', number: '3174121609', id: 2 },
    { name: 'Ayra Maria', number: '963258741', id: 3 },
    { name: 'Daniel Flechas', number: '3175689342', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterNames, setFilterNames] = useState('')
  const [showPersons, setShowPersons] = useState(persons)

  const addPerson = (event) => {
    event.preventDefault()
    const toCompare = newName
    
    if(persons.some(person => JSON.stringify(person.name)===JSON.stringify(toCompare))){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    }else{
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setShowPersons(showPersons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
   
  }
  
  
  const handleChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setFilterNames(event.target.value)
    showingData((event.target.value).toLowerCase())
  }
  const showingData = (text) => {
    if(text!==''){
      const filtered = persons.filter(person => (((person.name).toLowerCase()).includes(text) || ((person.number).toLowerCase()).includes(text)))
      setShowPersons(filtered)
    } else {
      setShowPersons(persons)
    }
  }
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter 
        filterNames={filterNames}
        handleFilter={handleFilter}
      />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleChange={handleChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PersonsList
        showPersons={showPersons}
        />
    </div>
  )
}

export default App;
