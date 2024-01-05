const { pool } = require('./../db.js');

exports.getTarjetas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tarjeta');
        if (rows.length <= 0) return res.status(404).json({
            message: 'Tarjetas not found'
        });
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.getTarjeta = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tarjeta WHERE id = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Tarjeta not found'
        });
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.createTarjeta = async (req, res) => {
    const { nombre, email, telefono, domicilio, ciudad, dni, ingresos, filial, mensaje } = req.body;
    const date = new Date();
    try {
        const [rows] = await pool.query('INSERT INTO tarjeta ( nombre, email, telefono, domicilio, ciudad, dni, ingresos, filial, mensaje, fecha ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, email, telefono, domicilio, ciudad, dni, ingresos, filial, mensaje, date]);
        res.send({
            id: rows.insertId,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.deleteTarjeta = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM tarjeta WHERE id = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Tarjeta not found'
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};
