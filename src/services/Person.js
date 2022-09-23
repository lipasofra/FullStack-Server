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

const deletingPerson = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(response => response.data)
}

const changeNumber = (id, changedPerson) => {
    const request = axios.put(`${url}/${id}`, changedPerson)
    return request.then(response => response.data)
}

const services = {
    create,
    getAll,
    deletingPerson,
    changeNumber
}


export default services