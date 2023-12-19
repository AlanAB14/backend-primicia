const { pool } = require('./../db.js');

exports.getTasas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tasas');
        if (rows.length <= 0) return res.status(404).json({
            message: 'Tasas not found'
        });
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.createTasa = async (req, res) => {
    const { tasaTitulo, tasaDescripcion, tna, tem, cft } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO tasas ( tasaTitulo, tasaDescripcion, tna, tem, cft ) VALUES (?, ?, ?, ?, ?)', [tasaTitulo, tasaDescripcion, tna, tem, cft]);
        res.send({
            id: rows.insertId,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.deleteTasa = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM tasas WHERE id = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Tasa not found'
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.updateTasa = async (req, res) => {
    const { id } = req.params;
    const { tasaTitulo, tasaDescripcion, tna, tem, cft } = req.body;
    try {
        const result = await pool.query('UPDATE tasas set tasaTitulo = IFNULL(?, tasaTitulo), tasaDescripcion = IFNULL(?, tasaDescripcion), tna = IFNULL(?, tna), tem = IFNULL(?, tem), cft = IFNULL(?, cft) WHERE id = ?', [tasaTitulo, tasaDescripcion, tna, tem, cft, id]);
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Tasa not found'
        });

        const [rows] = await pool.query('SELECT * FROM tasas WHERE id = ?', [id]);

        res.send(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};
