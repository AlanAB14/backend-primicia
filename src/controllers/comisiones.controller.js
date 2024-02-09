const { pool } = require('./../db.js');

exports.getComisiones = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM comisiones');
        if (rows.length <= 0) return res.status(404).json({
            message: 'Comisiones not found'
        });
        res.json(rows);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.updateComision = async (req, res) => {
    const { id } = req.params;
    const { comisionTitulo, comisionImporte } = req.body;
    try {
        const result = await pool.query('UPDATE comisiones set comisionTitulo = IFNULL(?, comisionTitulo), comisionImporte = IFNULL(?, comisionImporte) WHERE id = ?', [comisionTitulo, comisionImporte, id]);
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Comision not found'
        });

        const [rows] = await pool.query('SELECT * FROM comisiones WHERE id = ?', [id]);

        res.send(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};
