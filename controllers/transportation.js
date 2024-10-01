const pool = require('../db/db')

const createTransportation = async (req, res) => {
    const {
        cargo_date,
        cost,
        driver,
        from,
        price,
        to,
        transportation_comment,
        truck,
        truck_owner,
        user_id
    } = req.body;

    const query = `
        INSERT INTO transportation (
            cargo_date, cost, driver, location_from, price, location_to, transportation_comment, truck, truck_owner, user_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *;
    `;

    const values = [
        cargo_date,
        cost,
        driver,
        from,
        price,
        to,
        transportation_comment,
        truck,
        truck_owner,
        user_id
    ];

    try {
        const result = await pool.query(query, values);


        if (result.rows.length === 1) {
            return res.status(201).json(result.rows[0]); // Відправка нового запису з HTTP статусом 201
        }

        return res.status(200).json(result.rows); // Якщо вставлено кілька записів
    } catch (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Error inserting data' }); // Обробка помилок
    }
};

const getTransportationsList = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Номер сторінки
    const limit = parseInt(req.query.limit) || 10; // Кількість записів на сторінку
    const offset = (page - 1) * limit; // Зміщення

    try {
        const result = await pool.query(
            `SELECT * FROM transportation ORDER BY cargo_date DESC LIMIT $1 OFFSET $2`,
            [limit, offset]
        );

        const totalResult = await pool.query(`SELECT COUNT(*) FROM transportation`);
        const totalCount = totalResult.rows[0].count;

        res.json({
            data: result.rows,
            totalCount: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
        });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Error fetching data' });
    }
};
module.exports = {
    createTransportation,getTransportationsList

};
