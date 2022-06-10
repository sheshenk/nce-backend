import { pubsub } from "../src/apolloServer.js";
import { pool } from "../src/postgreServer.js";

export const readOpenBidOrders = async ({symbol}) => {
	var queryString = `SELECT * FROM open_bid_orders_${symbol} ORDER BY price DESC LIMIT 5`
	const res = await pool.query(queryString)
	return res.rows.length ? res.rows : null
}