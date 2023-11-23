const { Server } = require('socket.io');
const addToGuestCart = require('../services/addToGuestCart');
const { parse } = require('cookie');
const getGuestCart = require('../services/getGuestCart');

const initializeGuestCartWebSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true
        },
    });

    io.on('connection', (socket) => {
        try{
            let cookies = socket.handshake.headers.cookie
            let parsedCookies = cookies ? parse(cookies) : null
            const token = parsedCookies ? parsedCookies.token : null
            const sessionId = parsedCookies ? parsedCookies['connect.sid'] : null;
            if(!cookies || !token){
                socket.on('get-cart-guest', async()=>{
                    const cart = await getGuestCart(sessionId)
                    io.to(sessionId).emit('cart', cart)
                })
                socket.on('add-to-cart-guest', async(cartData)=>{
                    const response = await addToGuestCart(cartData, sessionId)
                    console.log(response)
                    const cart = await getGuestCart(sessionId)
                    io.to(sessionId).emit('cart', cart)
                })
                socket.on('delete-product-guest', async(cartData)=>{
                    const cart = await getGuestCart(sessionId)
                    cart = cart.filter((item)=>{
                        return item.cartProductId !== cartData.cartProductId
                    })
                    io.to(sessionId).emit('cart', cart)
                })
                socket.on('update-quantity-guest', async(cartData)=>{
                    const cart = await getGuestCart(sessionId)
                    cart = cart.map((item)=>{
                        if(item.cartProductId === cartData.cartProductId){
                            return cartData
                        }else{
                            return item
                        }
                    })
                    io.to(sessionId).emit('cart', cart)
                })
            }
        }catch(err){
            console.log("guest error ws: ", err)
            socket.disconnect()
        } 
    })
}

module.exports = initializeGuestCartWebSocket;