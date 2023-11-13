import { pool } from './../db.js'

export const getPreguntas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM preguntas')
        if (rows.length <= 0) return res.status(404).json({
            message: 'Preguntas not found'
        })
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }
}

export const createPregunta = async (req, res) => {
    const { pregunta, respuesta } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO preguntas ( pregunta, respuesta) VALUES (?, ?)', [ pregunta, respuesta ])
        res.send({
            id: rows.insertId,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }
}

export const deletePregunta = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM preguntas WHERE id = ?', [req.params.id])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Pregunta not found'
        })
    
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }

}

export const updatePregunta = async (req, res) => {
    const { id } = req.params
    const { pregunta, respuesta } = req.body
    try {
        const result = await pool.query('UPDATE preguntas set pregunta = IFNULL(?, pregunta), respuesta = IFNULL(?, respuesta) WHERE id = ?', [pregunta, respuesta, id])
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Pregunta not found'
        })
        
        const [rows] = await pool.query('SELECT * FROM preguntas WHERE id = ?', [id])
    
        res.send(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        }) 
    }
}

