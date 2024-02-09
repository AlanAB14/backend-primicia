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

exports.getComerciosPorFilialCategoriaPromocion = async (req, res) => {
    const { localidad, categoria, promocion } = req.body;
    console.log(localidad)
    try {
        let sqlQuery = 'SELECT * FROM comercios';
        const sqlParams = [];

        if (localidad && localidad.length > 0) {
            if (localidad.length === 1) {
                sqlQuery += ' WHERE filialId = ?';
                sqlParams.push(localidad[0]);
            } else {
                const placeholders = localidad.map(() => '?').join(',');
                sqlQuery += ' WHERE filialId IN (' + placeholders + ')';
                sqlParams.push(...localidad);
            }
        }

        if (categoria && categoria !== '' && categoria !== 'Todas') {
            sqlQuery += sqlQuery.includes('WHERE') ? ' AND categoriaId = ?' : ' WHERE categoriaId = ?';
            sqlParams.push(categoria);
        }

        if (promocion && promocion !== '' && promocion !== 'Todas' && promocion !== 'no') {
            sqlQuery += sqlQuery.includes('WHERE') ? ' AND promocionId = ?' : ' WHERE promocionId = ?';
            sqlParams.push(promocion);
        } else if (promocion === 'no') {
            sqlQuery += sqlQuery.includes('WHERE') ? ' AND promocionId IS NULL' : ' WHERE promocionId IS NULL';
        }

        const [rows] = await pool.query(sqlQuery, sqlParams);

        if (rows.length <= 0) {
            return res.json([]);
        }

        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};


exports.getComerciosPorFilial = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT c.*, cc.categoria FROM comercios c INNER JOIN categoria_comercio cc ON c.categoriaId = cc.id WHERE c.filialId = ?', [req.params.id]);
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
        const [rows] = await pool.query('SELECT * FROM comercios WHERE categoriaId = ?', [req.params.id]);
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
    const { categoriaId, nombre, direccion, filialId, promocionId } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO comercios ( categoriaId, nombre, direccion, filialId, promocionId ) VALUES (?, ?, ?, ?, ?)', [categoriaId, nombre, direccion, filialId, promocionId]);
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
    const { categoriaId, nombre, direccion, filialId, promocionId } = req.body;
    
    try {
        let query;
        let values;

        if (promocionId === 0) {
            // Si promocionId es 0, elimina el campo promocionId de la base de datos
            query = `
                UPDATE comercios
                SET
                    categoriaId = IFNULL(?, categoriaId),
                    nombre = IFNULL(?, nombre),
                    direccion = IFNULL(?, direccion),
                    filialId = IFNULL(?, filialId),
                    promocionId = NULL
                WHERE id = ?
            `;
            values = [categoriaId, nombre, direccion, filialId, id];
        } else {
            // Si promocionId no es 0, actualiza normalmente
            query = `
                UPDATE comercios
                SET
                    categoriaId = IFNULL(?, categoriaId),
                    nombre = IFNULL(?, nombre),
                    direccion = IFNULL(?, direccion),
                    filialId = IFNULL(?, filialId),
                    promocionId = IFNULL(?, promocionId)
                WHERE id = ?
            `;
            values = [categoriaId, nombre, direccion, filialId, promocionId, id];
        }

        const result = await pool.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Comercio not found'
            });
        }

        const [rows] = await pool.query('SELECT * FROM comercios WHERE id = ?', [id]);

        res.send(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};
