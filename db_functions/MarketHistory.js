import { pubsub } from "../src/apolloServer.js";
import { pool } from "../src/postgreServer.js";

export const updateMarketHistory = async ({symbol, price, volume}) => {
	try {
		const res = await pool.query(
			`INSERT INTO market_history (symbol, open, close, high, low, volume) VALUES ($1, $2, $2, $2, $2, $3) ON CONFLICT (time, symbol) DO UPDATE SET high = GREATEST(market_history.high, $2), low = LEAST(market_history.low, $2), close = $2, volume = market_history.volume + $3 RETURNING *`,
			[symbol, price, volume]
		)
		pubsub.publish('MH_UPDATED', { marketHistoryUpdated: res.rows[0] })
		return { status: 201, response: "Market history data added." }
	} catch (err) { console.log(err); return { status: 409, error: err.detail } }
}

export const readMarketHistory = async (single, {symbol}) => {
	var queryString = 'SELECT * FROM market_history ORDER BY time ASC'
	if (symbol) queryString = `SELECT * FROM market_history WHERE symbol='${symbol}'`
	const res = await pool.query(queryString)
	return res.rows.length ? single ? res.rows[0] : res.rows : null
}