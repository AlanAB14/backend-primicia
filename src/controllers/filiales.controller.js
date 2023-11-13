import { pool } from './../db.js'

export const getFiliales = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM filiales')
        if (rows.length <= 0) return res.status(404).json({
            message: 'Filiales not found'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }
}

export const getFilial = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM filiales WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Filial not found'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }
}

export const createFilial = async (req, res) => {
    const { localidad, direccion, email, telefono } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO filiales ( localidad, direccion, email, telefono ) VALUES (?, ?, ?, ?)', [ localidad, direccion, email, telefono ])
        res.send({
            id: rows.insertId,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }
}

export const deleteFilial = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM filiales WHERE id = ?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Filial not found'
        })
    
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }

}

export const updateFilial = async (req, res) => {
    const { id } = req.params
    const { localidad, direccion, email, telefono } = req.body
    try {
        const result = await pool.query('UPDATE filiales set localidad = IFNULL(?, localidad), direccion = IFNULL(?, direccion), email = IFNULL(?, email), telefono = IFNULL(?, telefono)  WHERE id = ?', [localidad, direccion, email, telefono, id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Filial not found'
        })
        
        const [rows] = await pool.query('SELECT * FROM filiales WHERE id = ?', [id])
    
        res.send(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }
}

