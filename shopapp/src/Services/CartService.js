import axios from "axios"

const getCart = async() => {
    const response = await axios.post('http://localhost:5000/c/cart', {}, { withCredentials: true })
    return response.data
}

const deleteFromCart = async(id, size) => {
    const response = axios.post('http://localhost:5000/c/cart/delete', {markedForDeletion: `${id}_${size}`}, { withCredentials: true })
    return response.data
}

const updateCart = async(id, quantity, fullPrice) => {
    const response = axios.post('http://localhost:5000/c/cart/update', {id: id, quantity: quantity, fullPrice: fullPrice}, { withCredentials: true })
    return response.data
}

const updateCartData = async(cart)=>{
    const response = await axios.post('http://localhost:5000/u/updateData', {cart: cart}, {withCredentials: true})
    return response.data
}

export {
    getCart,
    deleteFromCart,
    updateCart,
    updateCartData
}