const { Server } = require('socket.io');
const getCart = require('../services/getCart');
const { parse } = require('cookie');
const verifySocketToken = require('../middlewares/verifySocketToken');
const deleteFromCart = require('../services/deleteFromCart');
const addToCartArray = require('../services/addToCartArray');
const updateQuantityData = require('../services/updateQuantityData');
const updateSettingsData = require('../services/updateSettingsData');
const getSettingsData = require('../services/getSettingsData');
const getGuestCart = require('../services/getGuestCart');
const addToGuestCart = require('../services/addToGuestCart');
const deleteFromGuestCart = require('../services/deleteFromGuestCart');
const updateQuantityDataGuest = require('../services/updateQuantityDataGuest');

const initializeWebSocket = (server) => {
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
                console.log('guest')
                const room = `guest-${sessionId}`
                socket.join(room)
                socket.on('get-cart-guest', async()=>{
                    const cart = await getGuestCart(sessionId)
                    io.to(room).emit('cart', cart)
                })
                socket.on('add-to-cart-guest', async(cartData)=>{
                    const response = await addToGuestCart(cartData, sessionId)
                    const isCorrect = typeof response === 'string' ? false : true
                    if(isCorrect){
                        const cart = await getGuestCart(sessionId)
                        io.to(room).emit('cart', cart)
                    }
                    io.to(room).emit('item-added-info', isCorrect ? "Item added to cart" : "Item already in cart", isCorrect ? "green" : "red")
                })
                socket.on('delete-product-guest', async({id, size})=>{
                    await deleteFromGuestCart(sessionId, id, size)
                    const cart = await getGuestCart(sessionId)
                    io.to(room).emit('cart', cart)
                })
                socket.on('update-quantity-guest', async(cartDetails)=>{
                    await updateQuantityDataGuest(sessionId, cartDetails.quantityId, cartDetails.quantity, cartDetails.price)
                    const cart = await getGuestCart(sessionId)
                    io.to(room).emit('cart', cart)
                })
            }else{
                let userEmail

                const decodedToken = verifySocketToken(token)

                userEmail = decodedToken.email

                const roomName = `cart-${userEmail}`
                socket.join(roomName)
                socket.on('get-cart', async()=>{
                    console.log('cart socket')
                    const cart = await getCart(userEmail)
                    io.to(roomName).emit('cart', cart)
                })
                
                socket.on('delete-product', async({id, size})=>{
                    await deleteFromCart(userEmail, id, size)
                    const cart = await getCart(userEmail)
                    io.to(roomName).emit('cart', cart)
                })

                socket.on('add-to-cart', async(cartData)=>{

                    const response = await addToCartArray(userEmail, cartData)
                    const isCorrect = typeof response === 'string' ? false : true
                    if(isCorrect){
                        const cart = await getCart(userEmail)
                        io.to(roomName).emit('cart', cart)
                    }
                    io.to(roomName).emit('item-added-info', isCorrect ? "Item added to cart" : "Item already in cart", isCorrect ? "green" : "red")
                })

                socket.on('update-quantity', async(cartDetails)=>{
                    await updateQuantityData(userEmail, cartDetails.quantityId, cartDetails.quantity, cartDetails.price)
                    const cart = await getCart(userEmail)
                    io.to(roomName).emit('cart', cart)
                })

                socket.on('update-settings', async(settings)=>{
                    const response = await updateSettingsData(userEmail, settings)
                    io.to(roomName).emit('is-settings-success', response)
                })

                socket.on('get-settings', async()=>{
                    const response = await getSettingsData(userEmail)
                    console.log(response)
                    io.to(roomName).emit('settings', response)
                })
            }
            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        }catch(err){
            console.log('Error in socket', err)
            socket.disconnect()
        }
    });
}

module.exports = initializeWebSocket;