import { pubsub } from "../src/apolloServer.js";
import { pool } from "../src/postgreServer.js";

export const newNews = async ({header, details, symbol}) => {
	if (symbol) symbol = symbol.toUpperCase()
	try {
		const res = await pool.query(
			`INSERT INTO news (time, header, details, symbol) VALUES (date_trunc('minute'::text, now()), $1, $2, $3) RETURNING time, header, details, symbol`,
			[header, details, symbol]
		)
		// pubsub.publish('NEWS_ADDED', { newNewsAdded : res.rows[0] })
		console.log("NEWS ADDED ROW : ",res.rows[0])
		return { status: 201, response: "News added" }
	} catch (err) { console.log(err); return { status: 409, error: err.detail } }
}

export const getNews = async ({symbol, number}) => {
	if (symbol) symbol = symbol.toUpperCase()
	var queryString = `SELECT time, header, details, symbol FROM news ORDER BY time DESC`
	if (number) queryString = `SELECT time, header, details, symbol FROM news ORDER BY time DESC LIMIT ${number}`
	if (symbol) queryString = `SELECT time, header, details, symbol FROM news WHERE symbol = '${symbol}' ORDER BY time DESC`
	if (symbol && number) queryString = `SELECT time, header, details, symbol FROM news WHERE symbol = '${symbol}' ORDER BY time DESC LIMIT ${number}`
	// console.log(symbol, number, queryString)
	const res = await pool.query(queryString)
	return res.rows.length ? res.rows : null
}
