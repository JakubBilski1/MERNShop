import axios from "axios"

const getProducts = async () => {
    const response = await axios.post('http://localhost:5000/products')
    return response.data
}

const getFilteredProducts = async (filters) => {
    const response = await axios.post('http://localhost:5000/products/query', filters)
    return response.data
}

const getClickedProduct = async (shortName) => {
    const response = await axios.post(`http://localhost:5000/products/p/${shortName}`)
    return response.data
}

const getRandomProduct = async (num) => {
    const response = await axios.post(`http://localhost:5000/products/id/${num}`)
    return response.data
}

export {
    getProducts,
    getFilteredProducts,
    getClickedProduct,
    getRandomProduct
}