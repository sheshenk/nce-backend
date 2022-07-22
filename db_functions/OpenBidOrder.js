import { pool } from "../src/postgreServer.js";

export const readOpenBidOrders = async ({ symbol, number }) => {
	var queryString = `SELECT price, SUM(openquantity) as openquantity FROM open_bid_orders_${symbol} GROUP BY price ORDER BY price DESC LIMIT 5`
	if (number) queryString = `SELECT price, SUM(openquantity) as openquantity FROM open_bid_orders_${symbol} GROUP BY price ORDER BY price DESC LIMIT ${number}`
	if (number == 0) queryString = `SELECT price, SUM(openquantity) as openquantity FROM open_bid_orders_${symbol} GROUP BY price ORDER BY price DESC`
	const res = await pool.query(queryString)
	return res.rows.length ? res.rows : null
}

export const getOpenBidOrdersForSymbolAndUser = async ({ symbol, owner }) => {
	var queryString = `SELECT orderid, quantity, price, openquantity, fillcost, createdat, updatedat FROM OPEN_BID_ORDERS_${symbol}`
	if (owner) queryString = `SELECT orderid, quantity, price, openquantity, fillcost, createdat, updatedat FROM OPEN_BID_ORDERS_${symbol} WHERE owner=${owner}`
	const res = await pool.query(queryString)
	return res.rows.length ? res.rows : null
}