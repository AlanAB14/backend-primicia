const dotenv = require('dotenv');
dotenv.config();

// Exportar variables
module.exports.PORT = 3000;
module.exports.DB_USER = 'root';
module.exports.DB_PASSWORD = '';
module.exports.DB_HOST = 'localhost';
module.exports.DB_DATABASE = 'primicia';
module.exports.DB_PORT = 3306;

// module.exports.PORT = 3001;
// module.exports.DB_USER =  'root';
// module.exports.DB_PASSWORD =  '';
// module.exports.DB_HOST =  'localhost';
// module.exports.DB_DATABASE =  'owpkpamc_mutual';
// module.exports.DB_PORT =  3001;

module.exports.SECRET_KEY = 'TokenPrimicia';