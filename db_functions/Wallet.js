import { pool } from "../src/postgreServer.js";

export const createWallet = async ({userid}) => {
	try {
		const res = await pool.query(
			`INSERT INTO wallets (owner) VALUES ($1) RETURNING *`,
			[userid]
		)
		return { status: 201, response: "New wallet created." }
	} catch (err) { return { status: 409, error: err.detail } }
}

export const readWallet = async (single, {walletid, owner}) => {
	var queryString = 'SELECT * FROM wallets ORDER BY walletid ASC'
	if (owner) queryString = `SELECT * FROM wallets WHERE owner='${owner}'`
	if (walletid) queryString = `SELECT * FROM wallets WHERE walletid='${walletid}'`
	const res = await pool.query(queryString)
	return res.rows.length ? single ? res.rows[0] : res.rows : null
}