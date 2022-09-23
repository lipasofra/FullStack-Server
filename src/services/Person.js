import axios from 'axios'

const url = 'http://localhost:3001/persons'

const create = (newPerson) => {
    const request = axios.post(url, newPerson)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const services = {
    create,
    getAll
}


export default services