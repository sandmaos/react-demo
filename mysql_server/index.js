const app = require('./app');
const http = require('http');
const myDB = require('./database');
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

// Sync Sequelize model with DB (create tables if not exists)
(async () => {
    try {
        await myDB.sync({ force: false });
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
})();