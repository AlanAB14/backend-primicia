const { pool } = require('../db.js');

exports.getHabilitarFunciones = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM habilitar_funcion');
        if (rows.length <= 0) return res.status(404).json({
            message: 'Funcion not found'
        });
        res.json(rows);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.getHabilitarFuncion = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM habilitar_funcion WHERE id = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Funcion not found'
        });
        res.json(rows[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.updateHabilitarFuncion = async (req, res) => {
    const { id } = req.params;
    const { nombre, activated } = req.body;
    try {
        const result = await pool.query('UPDATE habilitar_funcion set nombre = IFNULL(?, nombre), activated = IFNULL(?, activated) WHERE id = ?', [nombre, activated, id]);
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Funcion not found'
        });

        const [rows] = await pool.query('SELECT * FROM habilitar_funcion WHERE id = ?', [id]);

        res.send(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};
