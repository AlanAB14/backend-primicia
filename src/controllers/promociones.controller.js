const { pool } = require('./../db.js');

exports.getPromociones = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM promociones');
        if (rows.length <= 0) return res.status(404).json({
            message: 'Promociones not found'
        });
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.getPromocion = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM promociones WHERE id = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Promocion not found'
        });
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.createPromocion = async (req, res) => {
    const { fechaInicio, fechaFin, diasPromocion, promocion, texto } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO promociones ( fechaInicio, fechaFin, diasPromocion, promocion, texto, image ) VALUES (?, ?, ?, ?, ?, ?)', [fechaInicio, fechaFin, diasPromocion, promocion, texto, image]);
        res.send({
            id: rows.insertId,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.deletePromocion = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM promociones WHERE id = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Promocion not found'
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.updatePromocion = async (req, res) => {
    const { id } = req.params;
    const { fechaInicio, fechaFin, diasPromocion, promocion, texto, image } = req.body;
    try {
        const result = await pool.query('UPDATE promociones set fechaInicio = IFNULL(?, fechaInicio), fechaFin = IFNULL(?, fechaFin), diasPromocion = IFNULL(?, diasPromocion), promocion = IFNULL(?, promocion), texto = IFNULL(?, texto), image = IFNULL(?, image)  WHERE id = ?', [fechaInicio, fechaFin, diasPromocion, promocion, texto, image, id]);
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Filial not found'
        });

        const [rows] = await pool.query('SELECT * FROM promociones WHERE id = ?', [id]);

        res.send(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};
