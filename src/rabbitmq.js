import amqp from "amqplib"

// Add, Symbol, Type, Side, Quantity, Price, Owner ID, Wallet ID
export const addOrder = async ({ symbol, type, side, quantity, price, ownerId, walletId }) => {
    try {
        return await sendMessage(symbol, `add ${symbol} ${type} ${side} ${quantity} ${price} ${ownerId} ${walletId}`);
    } catch (err) { return { status: 409, error: err.detail } }
}
// Cancel, Symbol, Side, Order ID, Price
export const cancelOrder = async ({ symbol, side, orderId, price }) => {
    try {
        return await sendMessage(symbol, `cancel ${symbol} ${side} ${orderId} ${price}`);
    } catch (err) { return { status: 409, error: err.detail } }
}
// Modify, Symbol, Side, Order ID, prev Quantity, prev Price, new Quantity, new Price
export const modifyOrder = async ({ symbol, side, orderId, prevQuantity, prevPrice, newQuantity, newPrice }) => {
    try {
        return await sendMessage(symbol, `modify ${symbol} ${side} ${orderId} ${prevQuantity} ${prevPrice} ${newQuantity} ${newPrice}`);
    } catch (err) { return { status: 409, error: err.detail } }
}

async function sendMessage(queue, msg) {
    queue = queue.toUpperCase();
    await amqp.connect('amqp://localhost').then(function (conn) {
        return conn.createChannel().then(async function (ch) {

            const ok = await ch.assertQueue(queue, { durable: false });

            if (ok) {
                ch.sendToQueue(queue, Buffer.from(msg));
                console.log(" [x] Sent '%s'", msg);
                return ch.close();
            };
        }).finally(function () { conn.close(); });
    }).catch(() => { return { status: 400, error: "Order not added" } });
    return { status: 201, response: "Order added" };
}
