const { Server } = require('socket.io');
const addToGuestCart = require('../services/addToGuestCart');

const initializeGuestCartWebSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true
        },
    });

    io.on('connection', (socket) => {
        let cart = []
        socket.on('get-cart-guest', ()=>{
            io.to(socket.id).emit('cart', cart)
        })
        socket.on('add-to-cart-guest', async(cartData)=>{
            const response = await addToGuestCart(cartData)
            console.log(response)
            io.to(socket.id).emit('cart', cart)
        })
        socket.on('delete-product-guest', (cartData)=>{
            cart = cart.filter((item)=>{
                return item.cartProductId !== cartData.cartProductId
            })
            io.to(socket.id).emit('cart', cart)
        })
        socket.on('update-quantity-guest', (cartData)=>{
            cart = cart.map((item)=>{
                if(item.cartProductId === cartData.cartProductId){
                    return cartData
                }else{
                    return item
                }
            })
            io.to(socket.id).emit('cart', cart)
        })
    })
}

module.exports = initializeGuestCartWebSocket;