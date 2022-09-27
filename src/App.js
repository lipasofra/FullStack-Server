import { useEffect, useState } from 'react'
import './App.css'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'
import personService from './services/Person'



const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterNames, setFilterNames] = useState('')
  const [showPersons, setShowPersons] = useState([])
  const [message, setMessage] = useState(null)


  useEffect(() => {
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
      setShowPersons(initialPersons)
    })
  },[])

  const onDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`))
    personService.deletingPerson(person.id)
    .then(()=>{
      setPersons(persons.filter(item => item.id !== person.id))
      setShowPersons(persons.filter(item => item.id !== person.id))
    })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const toCompare = newName
    
    if(persons.some(person => JSON.stringify(person.name)===JSON.stringify(toCompare))){
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`)
        ){
          const personChange = persons.find(person => JSON.stringify(person.name)===JSON.stringify(toCompare))
          const changedPerson = {...personChange, number: newNumber}
          personService.changeNumber(personChange.id, changedPerson)
          .then((personChanged)=>{
            setMessage(`The number of ${personChanged.name} was succesfully changed`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.map(item => item.id !== personChange.id ? item : personChanged))
            setShowPersons(persons.map(item => item.id !== personChange.id ? item : personChanged))
            setNewName('')
            setNewNumber('')
          })
          }
    }else{
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService.create(personObject)
      .then(createdPerson => {
        setMessage(`${createdPerson.name} was succesfully added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.concat(createdPerson))
        setShowPersons(showPersons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
      })
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
      {
        message ? 
        <Notification
          message={message}
        /> :
        <></>
      }
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
        onDelete={onDelete}
        />
    </div>
  )
}

export default App;
