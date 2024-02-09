const { pool } = require('./../db.js');

exports.getFiliales = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM filiales');
        if (rows.length <= 0) return res.status(404).json({
            message: 'Filiales not found'
        });
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.getFilial = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM filiales WHERE id = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Filial not found'
        });
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.createFilial = async (req, res) => {
    const { localidad, direccion, email, telefono, receptoria } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO filiales ( localidad, direccion, email, telefono, receptoria ) VALUES (?, ?, ?, ?, ?)', [localidad, direccion, email, telefono, receptoria]);
        res.send({
            id: rows.insertId,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.deleteFilial = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM filiales WHERE id = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Filial not found'
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.updateFilial = async (req, res) => {
    const { id } = req.params;
    const { localidad, direccion, email, telefono, receptoria } = req.body;
    try {
        const result = await pool.query('UPDATE filiales set localidad = IFNULL(?, localidad), direccion = IFNULL(?, direccion), email = IFNULL(?, email), telefono = IFNULL(?, telefono), receptoria = IFNULL(?, receptoria) WHERE id = ?', [localidad, direccion, email, telefono, receptoria, id]);
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Filial not found'
        });

        const [rows] = await pool.query('SELECT * FROM filiales WHERE id = ?', [id]);

        res.send(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};
