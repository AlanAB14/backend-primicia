const { pool } = require('./../db.js');
const { sendEmail } = require('./correo.controller.js');

exports.getCostoFinanciero = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM costo_financiero');
        if (rows.length <= 0) return res.status(404).json({
            message: 'Costo not found'
        });
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};


exports.updateCostoFinanciero = async (req, res) => {
    const { id } = req.params;
    const { percentage } = req.body;

    try {
        let query;
        let values;

        query = `
                UPDATE costo_financiero
                SET
                    percentage = IFNULL(?, percentage)
                WHERE id = ?
            `;
        values = [percentage, id];

        const result = await pool.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Costo not found'
            });
        }

        const [rows] = await pool.query('SELECT * FROM costo_financiero WHERE id = ?', [id]);

        res.send(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

