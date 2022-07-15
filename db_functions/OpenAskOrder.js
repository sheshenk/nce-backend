import { pool } from "../src/postgreServer.js";

export const readOpenAskOrders = async ({ symbol, number }) => {
	var queryString = `SELECT price, openquantity FROM open_ask_orders_${symbol} ORDER BY price DESC LIMIT 5`
	if (number) queryString = `SELECT price, openquantity FROM open_ask_orders_${symbol} ORDER BY price DESC LIMIT ${number}`
	if (number == 0) queryString = `SELECT price, openquantity FROM open_ask_orders_${symbol} ORDER BY price DESC`
	const res = await pool.query(queryString)
	return res.rows.length ? res.rows : null
}

export const getOpenAskOrdersForSymbolAndUser = async ({ symbol, owner }) => {
	var queryString = `SELECT price, openquantity FROM OPEN_ASK_ORDERS_${symbol}`
	if (owner) queryString = `SELECT price, openquantity FROM OPEN_ASK_ORDERS_${symbol} WHERE owner=${owner}`
	const res = await pool.query(queryString)
	return res.rows.length ? res.rows : null
}