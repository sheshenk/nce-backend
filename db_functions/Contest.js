import { pool } from "../src/postgreServer.js";

export const getUsersByContest = async ({ contestid }) => {
    var queryString = `SELECT * FROM USER_CONTESTS WHERE contestid=${contestid} ORDER BY return DESC`
    const res = await pool.query(queryString)
    return res.rows.length ? res.rows : NULL
}

export const getAllContests = async () => {
    var queryString = `SELECT * FROM CONTESTS ORDER BY id Limit 10`
    const res = await pool.query(queryString)
    return res.rows.length ? res.rows : NULL
}