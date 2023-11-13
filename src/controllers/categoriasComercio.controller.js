import { pool } from './../db.js'

export const getCategorias = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categoria_comercio')
        if (rows.length <= 0) return res.status(404).json({
            message: 'Categorias not found'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }
}

export const getCategoria = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categoria_comercio WHERE id = ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Categoria not found'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }
}

export const createCategoria = async (req, res) => {
    const { categoria } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO categoria_comercio ( categoria ) VALUES (?)', [ categoria ])
        res.send({
            id: rows.insertId,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }
}

export const deleteCategoria = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM categoria_comercio WHERE id = ?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Categoria not found'
        })
    
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }

}

export const updateCategoria = async (req, res) => {
    const { id } = req.params
    const { categoria } = req.body
    try {
        const result = await pool.query('UPDATE categoria_comercio set categoria = IFNULL(?, categoria) WHERE id = ?', [categoria, id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Categoria not found'
        })
        
        const [rows] = await pool.query('SELECT * FROM categoria_comercio WHERE id = ?', [id])
    
        res.send(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }
}

