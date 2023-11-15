const { Server } = require('socket.io');
const getCart = require('../services/getCart');
const { parse } = require('cookie');
const verifySocketToken = require('../middlewares/verifySocketToken');
const deleteFromCart = require('../services/deleteFromCart');
const addToCartArray = require('../services/addToCartArray');
const updateQuantityData = require('../services/updateQuantityData');

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
            if(!cookies){
                socket.disconnect()
                return
            }

            let parsedCookies = parse(cookies)
            let token = parsedCookies.token
            let userEmail
            if(!token){
                socket.disconnect()
                return
            }
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