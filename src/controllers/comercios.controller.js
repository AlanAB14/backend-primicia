const { pool } = require('./../db.js');

exports.getComercios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM comercios');
        if (rows.length <= 0) return res.status(404).json({
            message: 'Comercios not found'
        });
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.getComercio = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM comercios WHERE id = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Comercio not found'
        });
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.getComerciosPorFilial = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM comercios WHERE filialId = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Comercios not found'
        });
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.getComerciosPorCategoria = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM comercios WHERE comercioId = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Comercios not found'
        });
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.getComerciosPorCategoriaYFilial = async (req, res) => {
    const { categoriaId, filialId } = req.body;
    
    try {
        const [rows] = await pool.query('SELECT * FROM comercios WHERE categoriaId = ? AND filialId = ?', [categoriaId, filialId]);
        console.log(rows)
        
        if (rows.length <= 0) return res.status(202).json(null);
        res.json(rows);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.getComerciosPorPromocion = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM comercios WHERE promocionId = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Comercios not found'
        });
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.createComercio = async (req, res) => {
    const { comercioId, nombre, direccion, filialId, promocionId } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO comercios ( comercioId, nombre, direccion, filialId, promocionId ) VALUES (?, ?, ?, ?, ?)', [comercioId, nombre, direccion, filialId, promocionId]);
        res.send({
            id: rows.insertId,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.deleteComercio = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM comercios WHERE id = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Comercio not found'
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.updateComercio = async (req, res) => {
    const { id } = req.params;
    const { comercioId, nombre, direccion, filialId, promocionId } = req.body;
    try {
        const result = await pool.query('UPDATE comercios set comercioId = IFNULL(?, comercioId), nombre = IFNULL(?, nombre), direccion = IFNULL(?, direccion), filialId = IFNULL(?, filialId), promocionId = IFNULL(?, promocionId)  WHERE id = ?', [comercioId, nombre, direccion, filialId, promocionId, id]);
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Comercio not found'
        });

        const [rows] = await pool.query('SELECT * FROM comercios WHERE id = ?', [id]);

        res.send(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};