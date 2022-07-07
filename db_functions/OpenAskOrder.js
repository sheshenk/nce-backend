import { pubsub } from "../src/apolloServer.js";
import { pool } from "../src/postgreServer.js";

export const readOpenAskOrders = async ({symbol, number}) => {
	var queryString = `SELECT * FROM open_ask_orders_${symbol} ORDER BY price ASC LIMIT 5`
	if (number) queryString = `SELECT * FROM open_ask_orders_${symbol} ORDER BY price ASC LIMIT ${number}`
	if (number == 0) queryString = `SELECT * FROM open_ask_orders_${symbol} ORDER BY price ASC`
	const res = await pool.query(queryString)
	return res.rows.length ? res.rows : null
}

export const getOpenAskOrdersForSymbolAndUser = async ({symbol, owner}) => {
	var queryString = `SELECT * FROM OPEN_ASK_ORDERS_${symbol}`
    if (owner) queryString = `SELECT * FROM OPEN_ASK_ORDERS_${symbol} WHERE owner=${owner}`
	const res = await pool.query(queryString)
	return res.rows.length ? res.rows : null
}