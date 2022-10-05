import { pool } from "../src/postgreServer.js";

export const getUsersByContest = async ({ contestname, userid }) => {
    if (userid == -1) {
        var queryString = `SELECT * FROM USER_CONTESTS AS c LEFT JOIN PL_${contestname} AS p on c.USERID = p.id WHERE c.contestname = '${contestname}' ORDER BY return DESC LIMIT 10`
        const res = await pool.query(queryString)
        return res.rows.length ? res.rows.map((item) => { item.pltrend = Object.values(item).slice(-36); return item }) : NULL
    }
    var queryString = `SELECT * FROM USER_CONTESTS AS c LEFT JOIN PL_${contestname} AS p on c.USERID = ${userid} WHERE c.contestname = '${contestname}' LIMIT 1`
    const res = await pool.query(queryString)
    return res.rows.length ? res.rows.map((item) => { item.pltrend = Object.values(item).slice(-36); return item }) : NULL
}

export const getAllContests = async () => {
    var queryString = `SELECT * FROM CONTESTS ORDER BY id DESC Limit 10`
    const res = await pool.query(queryString)
    return res.rows.length ? res.rows : NULL
}