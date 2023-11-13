import { pool } from './../db.js'

export const getComercios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM comercios')
        if (rows.length <= 0) return res.status(404).json({
            message: 'Comercios not found'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }
}

export const getComercio = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM comercios WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Comercio not found'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }
}

export const getComerciosPorFilial = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM comercios WHERE filialId = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Comercios not found'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }
}

export const getComerciosPorCategoria = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM comercios WHERE categoriaId = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Comercios not found'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }
}

export const getComerciosPorPromocion = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM comercios WHERE promocionId = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Comercios not found'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }
}

export const createComercio = async (req, res) => {
    const { categoriaId, nombre, direccion, filialId, promocionId } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO comercios ( categoriaId, nombre, direccion, filialId, promocionId ) VALUES (?, ?, ?, ?, ?)', [ categoriaId, nombre, direccion, filialId, promocionId ])
        res.send({
            id: rows.insertId,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }
}

export const deleteComercio = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM comercios WHERE id = ?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Comercio not found'
        })
    
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }

}

export const updateComercio = async (req, res) => {
    const { id } = req.params
    const { categoriaId, nombre, direccion, filialId, promocionId } = req.body
    try {
        const result = await pool.query('UPDATE comercios set categoriaId = IFNULL(?, categoriaId), nombre = IFNULL(?, nombre), direccion = IFNULL(?, direccion), filialId = IFNULL(?, filialId), promocionId = IFNULL(?, promocionId)  WHERE id = ?', [categoriaId, nombre, direccion, filialId, promocionId, id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Comercio not found'
        })
        
        const [rows] = await pool.query('SELECT * FROM comercios WHERE id = ?', [id])
    
        res.send(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }
}

