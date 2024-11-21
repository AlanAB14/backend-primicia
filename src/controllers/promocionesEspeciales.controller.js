const { pool } = require('../db.js');

exports.getPromocionesEspecialesConImagen = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM promociones_especiales');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.getPromocionesEspeciales = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, fechaInicio, fechaFin, diasPromocion, promocion, texto, image, tieneContador FROM promociones_especiales');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.getPromocionEspecial = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM promociones_especiales WHERE id = ?', [req.params.id]);
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

exports.createPromocionEspecial = async (req, res) => {
    const { fechaInicio, fechaFin, diasPromocion, promocion, texto, image, tieneContador } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO promociones_especiales ( fechaInicio, fechaFin, diasPromocion, promocion, texto, image, tieneContador ) VALUES (?, ?, ?, ?, ?, ?, ?)', [fechaInicio, fechaFin, diasPromocion, promocion, texto, image, tieneContador]);
        res.send({
            id: rows.insertId,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.deletePromocionEspecial = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM promociones_especiales WHERE id = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Promocion not found'
        });

        if (result.affectedRows >= 1) {
            const result = await pool.query('UPDATE comercios SET promocionesEspecialesId = NULL WHERE promocionesEspecialesId = ?', [req.params.id]);
            // if (result.affectedRows === 0) return res.status(404).json({
            //     message: 'Error al borrar promocionesEspecialesId en cascada'
            // });
        }
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.updatePromocionEspecial = async (req, res) => {
    const { id } = req.params;
    const { fechaInicio, fechaFin, diasPromocion, promocion, texto, image, tieneContador } = req.body;
    try {
        const result = await pool.query('UPDATE promociones_especiales set fechaInicio = IFNULL(?, fechaInicio), fechaFin = IFNULL(?, fechaFin), diasPromocion = IFNULL(?, diasPromocion), promocion = IFNULL(?, promocion), texto = IFNULL(?, texto), image = IFNULL(?, image), tieneContador = IFNULL(?, tieneContador) WHERE id = ?', [fechaInicio, fechaFin, diasPromocion, promocion, texto, image, tieneContador, id]);
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Filial not found'
        });

        const [rows] = await pool.query('SELECT * FROM promociones_especiales WHERE id = ?', [id]);

        res.send(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};
