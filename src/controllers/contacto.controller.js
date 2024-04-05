const { pool } = require('./../db.js');
const { sendEmail } = require('./correo.controller.js');

exports.getContactos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM contactos');
        if (rows.length <= 0) return res.status(404).json({
            message: 'Contactos not found'
        });
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.getContacto = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM contactos WHERE id = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Contacto not found'
        });
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.createContacto = async (req, res) => {
    const { motivo, nombre, dni, ciudad, email, filial, mensaje } = req.body;
    const date = new Date();
    try {
        const [rows] = await pool.query('INSERT INTO contactos ( motivo, nombre, dni, ciudad, email, filial, mensaje, fecha ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [motivo, nombre, dni, ciudad, email, filial, mensaje, date]);
        const camposContacto = { motivo, nombre, dni, ciudad, email, filial, mensaje }
        sendEmail('Solicitud de contacto', camposContacto);
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

exports.deleteContacto = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM contactos WHERE id = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Contacto not found'
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};
