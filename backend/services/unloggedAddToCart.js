const unloggedAddToCart = (cartData) => {
    const result = window.localStorage.setItem('cart', JSON.stringify(cartData))
    return result
}

module.exports = unloggedAddToCart;