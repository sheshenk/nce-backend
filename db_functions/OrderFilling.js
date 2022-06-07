import { pubsub } from "../src/apolloServer.js";
import { pool } from "../src/postgreServer.js";

export const createOrderFilling = async ({symbol, quantity, price}) => {
	try {
		const res = await pool.query(
			`INSERT INTO order_fillings (symbol, quantity, price) VALUES ($1, $2, $3) RETURNING *`,
			[symbol, quantity, price]
		)
		pubsub.publish('NEW_ORDER_FILLED', { newOrder: res.rows[0] })
		return { status: 201, response: "New order filling data added." }
	} catch (err) { console.log(err); return { status: 409, error: err.detail } }
}

export const readOrderFillings = async (single, {symbol}) => {
	var queryString = 'SELECT * FROM order_fillings ORDER BY time ASC'
	if (symbol) queryString = `SELECT * FROM order_fillings WHERE symbol='${symbol}'`
	const res = await pool.query(queryString)
	return res.rows.length ? single ? res.rows[0] : res.rows : null
}