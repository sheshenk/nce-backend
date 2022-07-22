import { pool } from "../src/postgreServer.js";

export const readOpenAskOrders = async ({ symbol, number }) => {
	var queryString = `SELECT price, openquantity FROM (SELECT price, SUM(openquantity) as openquantity FROM open_ask_orders_${symbol} GROUP BY price ORDER BY price ASC LIMIT 4) as a ORDER BY price DESC`
	if (number) queryString = `SELECT price, openquantity FROM (SELECT price, SUM(openquantity) as openquantity FROM open_ask_orders_${symbol} GROUP BY price ORDER BY price ASC LIMIT ${number}) as a ORDER BY price DESC`
	if (number == 0) queryString = `SELECT price, openquantity FROM (SELECT price, SUM(openquantity) as openquantity FROM open_ask_orders_${symbol} GROUP BY price ORDER BY price ASC) as a ORDER BY price DESC`
	const res = await pool.query(queryString)
	return res.rows.length ? res.rows : null
}

export const getOpenAskOrdersForSymbolAndUser = async ({ symbol, owner }) => {
	var queryString = `SELECT orderid, quantity, price, openquantity, fillcost, createdat, updatedat FROM OPEN_ASK_ORDERS_${symbol}`
	if (owner) queryString = `SELECT orderid, quantity, price, openquantity, fillcost, createdat, updatedat FROM OPEN_ASK_ORDERS_${symbol} WHERE owner=${owner}`
	const res = await pool.query(queryString)
	return res.rows.length ? res.rows : null
}